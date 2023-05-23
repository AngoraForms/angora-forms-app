"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _querystring = require("querystring");
const _chalk = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/chalk"));
const _webpackconfig = require("../../webpack-config");
const _getmodulebuildinfo = require("./get-module-build-info");
const _verifyRootLayout = require("../../../lib/verifyRootLayout");
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../../output/log"));
const _constants = require("../../../lib/constants");
const _discover = require("./metadata/discover");
const _fs = require("fs");
const _isapprouteroute = require("../../../lib/is-app-route-route");
const _ismetadataroute = require("../../../lib/metadata/is-metadata-route");
const _apppathnamenormalizer = require("../../../server/future/normalizers/built/app/app-pathname-normalizer");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const isNotResolvedError = (err)=>err.message.includes("Can't resolve");
const FILE_TYPES = {
    layout: "layout",
    template: "template",
    error: "error",
    loading: "loading",
    "not-found": "not-found"
};
const GLOBAL_ERROR_FILE_TYPE = "global-error";
const PAGE_SEGMENT = "page$";
async function createAppRouteCode({ name , page , pagePath , resolver , pageExtensions , nextConfigOutput  }) {
    // routePath is the path to the route handler file,
    // but could be aliased e.g. private-next-app-dir/favicon.ico
    const routePath = pagePath.replace(/[\\/]/, "/");
    // This, when used with the resolver will give us the pathname to the built
    // route handler file.
    let resolvedPagePath = await resolver(routePath);
    if (!resolvedPagePath) {
        throw new Error(`Invariant: could not resolve page path for ${name} at ${routePath}`);
    }
    // If this is a metadata route, then we need to use the metadata loader for
    // the route to ensure that the route is generated.
    const filename = _path.default.parse(resolvedPagePath).name;
    if ((0, _ismetadataroute.isMetadataRoute)(name) && filename !== "route") {
        resolvedPagePath = `next-metadata-route-loader?${(0, _querystring.stringify)({
            page,
            pageExtensions
        })}!${resolvedPagePath + _discover.METADATA_RESOURCE_QUERY}`;
    }
    // References the route handler file to load found in `./routes/${kind}.ts`.
    // TODO: allow switching to the different kinds of routes
    const kind = "app-route";
    const normalizer = new _apppathnamenormalizer.AppPathnameNormalizer();
    const pathname = normalizer.normalize(page);
    // This is providing the options defined by the route options type found at
    // ./routes/${kind}.ts. This is stringified here so that the literal for
    // `userland` can reference the variable for `userland` that's in scope for
    // the loader code.
    const options = `{
    userland,
    pathname: ${JSON.stringify(pathname)},
    resolvedPagePath: ${JSON.stringify(resolvedPagePath)},
    nextConfigOutput: ${nextConfigOutput ? JSON.stringify(nextConfigOutput) : "undefined"},
  }`;
    return `
    import 'next/dist/server/node-polyfill-headers'

    import RouteModule from 'next/dist/server/future/route-modules/${kind}/module'

    import * as userland from ${JSON.stringify(resolvedPagePath)}

    const routeModule = new RouteModule(${options})

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "${page}"

    export {
      routeModule,
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout,
      originalPathname
    }`;
}
const normalizeParallelKey = (key)=>key.startsWith("@") ? key.slice(1) : key;
const isDirectory = async (pathname)=>{
    try {
        const stat = await _fs.promises.stat(pathname);
        return stat.isDirectory();
    } catch (err) {
        return false;
    }
};
async function createTreeCodeFromPath(pagePath, { resolver , resolvePath , resolveParallelSegments , loaderContext , pageExtensions , basePath  }) {
    const splittedPath = pagePath.split(/[\\/]/);
    const appDirPrefix = splittedPath[0];
    const pages = [];
    let rootLayout;
    let globalError;
    async function resolveAdjacentParallelSegments(segmentPath) {
        const absoluteSegmentPath = await resolver(`${appDirPrefix}${segmentPath}`, true);
        if (!absoluteSegmentPath) {
            return [];
        }
        const segmentIsDirectory = await isDirectory(absoluteSegmentPath);
        if (!segmentIsDirectory) {
            return [];
        }
        // We need to resolve all parallel routes in this level.
        const files = await _fs.promises.readdir(absoluteSegmentPath);
        const parallelSegments = [
            "children"
        ];
        await Promise.all(files.map(async (file)=>{
            const filePath = _path.default.join(absoluteSegmentPath, file);
            const stat = await _fs.promises.stat(filePath);
            if (stat.isDirectory() && file.startsWith("@")) {
                parallelSegments.push(file);
            }
        }));
        return parallelSegments;
    }
    async function createSubtreePropsFromSegmentPath(segments) {
        const segmentPath = segments.join("/");
        // Existing tree are the children of the current segment
        const props = {};
        const isRootLayer = segments.length === 0;
        const isRootLayoutOrRootPage = segments.length <= 1;
        // We need to resolve all parallel routes in this level.
        const parallelSegments = [];
        if (isRootLayer) {
            parallelSegments.push([
                "children",
                ""
            ]);
        } else {
            parallelSegments.push(...resolveParallelSegments(segmentPath));
        }
        let metadata = null;
        try {
            const routerDirPath = `${appDirPrefix}${segmentPath}`;
            const resolvedRouteDir = await resolver(routerDirPath, true);
            if (resolvedRouteDir) {
                metadata = await (0, _discover.createStaticMetadataFromRoute)(resolvedRouteDir, {
                    basePath,
                    segment: segmentPath,
                    resolvePath,
                    isRootLayoutOrRootPage,
                    loaderContext,
                    pageExtensions
                });
            }
        } catch (err) {
            if (isNotResolvedError(err)) {
                throw err;
            }
        }
        for (const [parallelKey, parallelSegment] of parallelSegments){
            if (parallelSegment === PAGE_SEGMENT) {
                const matchedPagePath = `${appDirPrefix}${segmentPath}${parallelKey === "children" ? "" : `/${parallelKey}`}/page`;
                const resolvedPagePath = await resolver(matchedPagePath);
                if (resolvedPagePath) pages.push(resolvedPagePath);
                // Use '' for segment as it's the page. There can't be a segment called '' so this is the safest way to add it.
                props[normalizeParallelKey(parallelKey)] = `['__PAGE__', {}, {
          page: [() => import(/* webpackMode: "eager" */ ${JSON.stringify(resolvedPagePath)}), ${JSON.stringify(resolvedPagePath)}],
          ${(0, _discover.createMetadataExportsCode)(metadata)}
        }]`;
                continue;
            }
            const { treeCode: subtreeCode  } = await createSubtreePropsFromSegmentPath([
                ...segments,
                ...parallelKey === "children" ? [] : [
                    parallelKey
                ],
                Array.isArray(parallelSegment) ? parallelSegment[0] : parallelSegment
            ]);
            const parallelSegmentPath = segmentPath + "/" + (parallelKey === "children" ? "" : `${parallelKey}/`) + (Array.isArray(parallelSegment) ? parallelSegment[0] : parallelSegment);
            // `page` is not included here as it's added above.
            const filePaths = await Promise.all(Object.values(FILE_TYPES).map(async (file)=>{
                return [
                    file,
                    await resolver(`${appDirPrefix}${// TODO-APP: parallelSegmentPath sometimes ends in `/` but sometimes it doesn't. This should be consistent.
                    parallelSegmentPath.endsWith("/") ? parallelSegmentPath : parallelSegmentPath + "/"}${file}`)
                ];
            }));
            const definedFilePaths = filePaths.filter(([, filePath])=>filePath !== undefined);
            if (!rootLayout) {
                var _definedFilePaths_find;
                const layoutPath = (_definedFilePaths_find = definedFilePaths.find(([type])=>type === "layout")) == null ? void 0 : _definedFilePaths_find[1];
                rootLayout = layoutPath;
                if (layoutPath) {
                    globalError = await resolver(`${_path.default.dirname(layoutPath)}/${GLOBAL_ERROR_FILE_TYPE}`);
                }
            }
            props[normalizeParallelKey(parallelKey)] = `[
        '${Array.isArray(parallelSegment) ? parallelSegment[0] : parallelSegment}',
        ${subtreeCode},
        {
          ${definedFilePaths.map(([file, filePath])=>{
                return `'${file}': [() => import(/* webpackMode: "eager" */ ${JSON.stringify(filePath)}), ${JSON.stringify(filePath)}],`;
            }).join("\n")}
          ${(0, _discover.createMetadataExportsCode)(metadata)}
        }
      ]`;
        }
        const adjacentParallelSegments = await resolveAdjacentParallelSegments(segmentPath);
        for (const adjacentParallelSegment of adjacentParallelSegments){
            if (!props[normalizeParallelKey(adjacentParallelSegment)]) {
                const actualSegment = adjacentParallelSegment === "children" ? "" : adjacentParallelSegment;
                const defaultPath = await resolver(`${appDirPrefix}${segmentPath}/${actualSegment}/default`) ?? await resolver(`next/dist/client/components/parallel-route-default`, false, true);
                props[normalizeParallelKey(adjacentParallelSegment)] = `[
          '__DEFAULT__',
          {},
          {
            defaultPage: [() => import(/* webpackMode: "eager" */ ${JSON.stringify(defaultPath)}), ${JSON.stringify(defaultPath)}],
          }
        ]`;
            }
        }
        return {
            treeCode: `{
        ${Object.entries(props).map(([key, value])=>`${key}: ${value}`).join(",\n")}
      }`
        };
    }
    const { treeCode  } = await createSubtreePropsFromSegmentPath([]);
    return {
        treeCode: `const tree = ${treeCode}.children;`,
        pages: `const pages = ${JSON.stringify(pages)};`,
        rootLayout,
        globalError
    };
}
function createAbsolutePath(appDir, pathToTurnAbsolute) {
    return pathToTurnAbsolute// Replace all POSIX path separators with the current OS path separator
    .replace(/\//g, _path.default.sep).replace(/^private-next-app-dir/, appDir);
}
const nextAppLoader = async function nextAppLoader() {
    const loaderOptions = this.getOptions();
    const { name , appDir , appPaths , pagePath , pageExtensions , rootDir , tsconfigPath , isDev , nextConfigOutput , preferredRegion , basePath  } = loaderOptions;
    const buildInfo = (0, _getmodulebuildinfo.getModuleBuildInfo)(this._module);
    const page = name.replace(/^app/, "");
    buildInfo.route = {
        page,
        absolutePagePath: createAbsolutePath(appDir, pagePath),
        preferredRegion
    };
    const extensions = pageExtensions.map((extension)=>`.${extension}`);
    const resolveOptions = {
        ..._webpackconfig.NODE_RESOLVE_OPTIONS,
        extensions
    };
    const resolve = this.getResolve(resolveOptions);
    // a resolver for internal next files. We need to override the extensions, in case
    // a project doesn't have the same ones as used by next.
    const internalResolve = this.getResolve({
        ...resolveOptions,
        extensions: [
            ...extensions,
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
        ]
    });
    const normalizedAppPaths = typeof appPaths === "string" ? [
        appPaths
    ] : appPaths || [];
    const resolveParallelSegments = (pathname)=>{
        const matched = {};
        for (const appPath of normalizedAppPaths){
            if (appPath.startsWith(pathname + "/")) {
                const rest = appPath.slice(pathname.length + 1).split("/");
                // It is the actual page, mark it specially.
                if (rest.length === 1 && rest[0] === "page") {
                    matched.children = PAGE_SEGMENT;
                    continue;
                }
                const isParallelRoute = rest[0].startsWith("@");
                if (isParallelRoute && rest.length === 2 && rest[1] === "page") {
                    matched[rest[0]] = PAGE_SEGMENT;
                    continue;
                }
                if (isParallelRoute) {
                    matched[rest[0]] = rest.slice(1);
                    continue;
                }
                matched.children = rest[0];
            }
        }
        return Object.entries(matched);
    };
    const resolver = async (pathname, resolveDir, internal)=>{
        if (resolveDir) {
            return createAbsolutePath(appDir, pathname);
        }
        try {
            const resolved = await (internal ? internalResolve : resolve)(this.rootContext, pathname);
            this.addDependency(resolved);
            return resolved;
        } catch (err) {
            const absolutePath = createAbsolutePath(appDir, pathname);
            for (const ext of extensions){
                const absolutePathWithExtension = `${absolutePath}${ext}`;
                this.addMissingDependency(absolutePathWithExtension);
            }
            if (isNotResolvedError(err)) {
                return undefined;
            }
            throw err;
        }
    };
    if ((0, _isapprouteroute.isAppRouteRoute)(name)) {
        return createAppRouteCode({
            // TODO: investigate if the local `page` is the same as the loaderOptions.page
            page: loaderOptions.page,
            name,
            pagePath,
            resolver,
            pageExtensions,
            nextConfigOutput
        });
    }
    const { treeCode , pages: pageListCode , rootLayout , globalError  } = await createTreeCodeFromPath(pagePath, {
        resolver,
        resolvePath: (pathname)=>resolve(this.rootContext, pathname),
        resolveParallelSegments,
        loaderContext: this,
        pageExtensions,
        basePath
    });
    if (!rootLayout) {
        if (!isDev) {
            // If we're building and missing a root layout, exit the build
            _log.error(`${_chalk.default.bold(pagePath.replace(`${_constants.APP_DIR_ALIAS}/`, ""))} doesn't have a root layout. To fix this error, make sure every page has a root layout.`);
            process.exit(1);
        } else {
            // In dev we'll try to create a root layout
            const [createdRootLayout, rootLayoutPath] = await (0, _verifyRootLayout.verifyRootLayout)({
                appDir: appDir,
                dir: rootDir,
                tsconfigPath: tsconfigPath,
                pagePath,
                pageExtensions
            });
            if (!createdRootLayout) {
                let message = `${_chalk.default.bold(pagePath.replace(`${_constants.APP_DIR_ALIAS}/`, ""))} doesn't have a root layout. `;
                if (rootLayoutPath) {
                    var _this__compiler;
                    message += `We tried to create ${_chalk.default.bold(_path.default.relative(((_this__compiler = this._compiler) == null ? void 0 : _this__compiler.context) ?? "", rootLayoutPath))} for you but something went wrong.`;
                } else {
                    message += "To fix this error, make sure every page has a root layout.";
                }
                throw new Error(message);
            }
        }
    }
    const result = `
    export ${treeCode}
    export ${pageListCode}

    export { default as AppRouter } from 'next/dist/client/components/app-router'
    export { default as LayoutRouter } from 'next/dist/client/components/layout-router'
    export { default as RenderFromTemplateContext } from 'next/dist/client/components/render-from-template-context'
    export { default as GlobalError } from ${JSON.stringify(globalError || "next/dist/client/components/error-boundary")}

    export { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage'

    export { requestAsyncStorage } from 'next/dist/client/components/request-async-storage'
    export { actionAsyncStorage } from 'next/dist/client/components/action-async-storage'

    export { staticGenerationBailout } from 'next/dist/client/components/static-generation-bailout'
    export { default as StaticGenerationSearchParamsBailoutProvider } from 'next/dist/client/components/static-generation-searchparams-bailout-provider'
    export { createSearchParamsBailoutProxy } from 'next/dist/client/components/searchparams-bailout-proxy'

    export * as serverHooks from 'next/dist/client/components/hooks-server-context'

    export { renderToReadableStream, decodeReply, decodeAction } from 'react-server-dom-webpack/server.edge'
    export const __next_app_webpack_require__ = __webpack_require__
    export { preloadStyle, preloadFont, preconnect } from 'next/dist/server/app-render/rsc/preloads'

    export const originalPathname = "${page}"
  `;
    return result;
};
const _default = nextAppLoader;

//# sourceMappingURL=next-app-loader.js.map