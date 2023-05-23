"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientReferenceEntryPlugin", {
    enumerable: true,
    get: function() {
        return ClientReferenceEntryPlugin;
    }
});
const _webpack = require("next/dist/compiled/webpack/webpack");
const _querystring = require("querystring");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _ondemandentryhandler = require("../../../server/dev/on-demand-entry-handler");
const _constants = require("../../../lib/constants");
const _constants1 = require("../../../shared/lib/constants");
const _utils = require("../loaders/utils");
const _utils1 = require("../utils");
const _normalizepathsep = require("../../../shared/lib/page-path/normalize-path-sep");
const _buildcontext = require("../../build-context");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PLUGIN_NAME = "ClientEntryPlugin";
const pluginState = (0, _buildcontext.getProxiedPluginState)({
    // A map to track "action" -> "list of bundles".
    serverActions: {},
    edgeServerActions: {},
    actionModServerId: {},
    actionModEdgeServerId: {},
    // Manifest of CSS entry files for server/edge server.
    serverCSSManifest: {},
    edgeServerCSSManifest: {},
    // Mapping of resource path to module id for server/edge server.
    serverModuleIds: {},
    edgeServerModuleIds: {},
    // Collect modules from server/edge compiler in client layer,
    // and detect if it's been used, and mark it as `async: true` for react.
    // So that react could unwrap the async module from promise and render module itself.
    ASYNC_CLIENT_MODULES: [],
    injectedClientEntries: {}
});
class ClientReferenceEntryPlugin {
    constructor(options){
        this.dev = options.dev;
        this.appDir = options.appDir;
        this.isEdgeServer = options.isEdgeServer;
        this.useServerActions = options.useServerActions;
        this.assetPrefix = !this.dev && !this.isEdgeServer ? "../" : "";
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory  })=>{
            compilation.dependencyFactories.set(_webpack.webpack.dependencies.ModuleDependency, normalModuleFactory);
            compilation.dependencyTemplates.set(_webpack.webpack.dependencies.ModuleDependency, new _webpack.webpack.dependencies.NullDependency.Template());
        });
        compiler.hooks.finishMake.tapPromise(PLUGIN_NAME, (compilation)=>this.createClientEntries(compiler, compilation));
        compiler.hooks.afterCompile.tap(PLUGIN_NAME, (compilation)=>{
            const recordModule = (modId, mod)=>{
                var _mod_resourceResolveData;
                const modResource = ((_mod_resourceResolveData = mod.resourceResolveData) == null ? void 0 : _mod_resourceResolveData.path) || mod.resource;
                if (mod.layer !== _constants.WEBPACK_LAYERS.client) {
                    return;
                }
                // Check mod resource to exclude the empty resource module like virtual module created by next-flight-client-entry-loader
                if (typeof modId !== "undefined" && modResource) {
                    // Note that this isn't that reliable as webpack is still possible to assign
                    // additional queries to make sure there's no conflict even using the `named`
                    // module ID strategy.
                    let ssrNamedModuleId = _path.default.relative(compiler.context, modResource);
                    if (!ssrNamedModuleId.startsWith(".")) {
                        // TODO use getModuleId instead
                        ssrNamedModuleId = `./${(0, _normalizepathsep.normalizePathSep)(ssrNamedModuleId)}`;
                    }
                    if (this.isEdgeServer) {
                        pluginState.edgeServerModuleIds[ssrNamedModuleId.replace(/\/next\/dist\/esm\//, "/next/dist/")] = modId;
                    } else {
                        pluginState.serverModuleIds[ssrNamedModuleId] = modId;
                    }
                }
            };
            (0, _utils1.traverseModules)(compilation, (mod, _chunk, _chunkGroup, modId)=>{
                // The module must has request, and resource so it's not a new entry created with loader.
                // Using the client layer module, which doesn't have `rsc` tag in buildInfo.
                if (mod.request && mod.resource && !mod.buildInfo.rsc) {
                    if (compilation.moduleGraph.isAsync(mod)) {
                        pluginState.ASYNC_CLIENT_MODULES.push(mod.resource);
                    }
                }
                recordModule(String(modId), mod);
            });
        });
        compiler.hooks.make.tap(PLUGIN_NAME, (compilation)=>{
            compilation.hooks.processAssets.tap({
                name: PLUGIN_NAME,
                stage: _webpack.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_HASH
            }, (assets)=>this.createActionAssets(compilation, assets));
        });
    }
    async createClientEntries(compiler, compilation) {
        const addClientEntryAndSSRModulesList = [];
        const addActionEntryList = [];
        const actionMapsPerEntry = {};
        // For each SC server compilation entry, we need to create its corresponding
        // client component entry.
        (0, _utils1.forEachEntryModule)(compilation, ({ name , entryModule  })=>{
            const internalClientComponentEntryImports = new Set();
            const actionEntryImports = new Map();
            for (const connection of compilation.moduleGraph.getOutgoingConnections(entryModule)){
                // Entry can be any user defined entry files such as layout, page, error, loading, etc.
                const entryDependency = connection.dependency;
                const entryRequest = connection.dependency.request;
                const { clientImports , actionImports  } = this.collectComponentInfoFromDependencies({
                    entryRequest,
                    compilation,
                    dependency: entryDependency
                });
                actionImports.forEach(([dep, names])=>actionEntryImports.set(dep, names));
                const isAbsoluteRequest = _path.default.isAbsolute(entryRequest);
                // Next.js internals are put into a separate entry.
                if (!isAbsoluteRequest) {
                    clientImports.forEach((value)=>internalClientComponentEntryImports.add(value));
                    continue;
                }
                const relativeRequest = isAbsoluteRequest ? _path.default.relative(compilation.options.context, entryRequest) : entryRequest;
                // Replace file suffix as `.js` will be added.
                const bundlePath = (0, _normalizepathsep.normalizePathSep)(relativeRequest.replace(/\.[^.\\/]+$/, "").replace(/^src[\\/]/, ""));
                addClientEntryAndSSRModulesList.push(this.injectClientEntryAndSSRModules({
                    compiler,
                    compilation,
                    entryName: name,
                    clientImports,
                    bundlePath,
                    absolutePagePath: entryRequest
                }));
            }
            // Create internal app
            addClientEntryAndSSRModulesList.push(this.injectClientEntryAndSSRModules({
                compiler,
                compilation,
                entryName: name,
                clientImports: [
                    ...internalClientComponentEntryImports
                ],
                bundlePath: _constants1.APP_CLIENT_INTERNALS
            }));
            if (actionEntryImports.size > 0) {
                if (!this.useServerActions) {
                    compilation.errors.push(new Error("Server Actions require `experimental.serverActions` option to be enabled in your Next.js config: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions"));
                } else {
                    if (!actionMapsPerEntry[name]) {
                        actionMapsPerEntry[name] = new Map();
                    }
                    actionMapsPerEntry[name] = new Map([
                        ...actionMapsPerEntry[name],
                        ...actionEntryImports
                    ]);
                }
            }
        });
        for (const [name, actionEntryImports] of Object.entries(actionMapsPerEntry)){
            addActionEntryList.push(this.injectActionEntry({
                compiler,
                compilation,
                actions: actionEntryImports,
                entryName: name,
                bundlePath: name
            }));
        }
        // To collect all CSS imports and action imports for a specific entry
        // including the ones that are in the client graph, we need to store a
        // map for client boundary dependencies.
        function collectClientEntryDependencyMap(name) {
            const clientEntryDependencyMap = {};
            const entry = compilation.entries.get(name);
            entry.includeDependencies.forEach((dep)=>{
                if (dep.request && dep.request.startsWith("next-flight-client-entry-loader?")) {
                    const mod = compilation.moduleGraph.getResolvedModule(dep);
                    compilation.moduleGraph.getOutgoingConnections(mod).forEach((connection)=>{
                        if (connection.dependency) {
                            clientEntryDependencyMap[connection.dependency.request] = connection.dependency;
                        }
                    });
                }
            });
            return clientEntryDependencyMap;
        }
        // We need to create extra action entries that are created in the
        // client layer.
        compilation.hooks.finishModules.tapPromise(PLUGIN_NAME, ()=>{
            const addedClientActionEntryList = [];
            const actionMapsPerClientEntry = {};
            (0, _utils1.forEachEntryModule)(compilation, ({ name , entryModule  })=>{
                const actionEntryImports = new Map();
                const clientEntryDependencyMap = collectClientEntryDependencyMap(name);
                const tracked = new Set();
                for (const connection of compilation.moduleGraph.getOutgoingConnections(entryModule)){
                    const entryDependency = connection.dependency;
                    const entryRequest = connection.dependency.request;
                    // It is possible that the same entry is added multiple times in the
                    // connection graph. We can just skip these to speed up the process.
                    if (tracked.has(entryRequest)) continue;
                    tracked.add(entryRequest);
                    const { clientActionImports  } = this.collectComponentInfoFromDependencies({
                        entryRequest,
                        compilation,
                        dependency: entryDependency,
                        clientEntryDependencyMap
                    });
                    clientActionImports.forEach(([dep, names])=>actionEntryImports.set(dep, names));
                }
                if (actionEntryImports.size > 0) {
                    if (!actionMapsPerClientEntry[name]) {
                        actionMapsPerClientEntry[name] = new Map();
                    }
                    actionMapsPerClientEntry[name] = new Map([
                        ...actionMapsPerClientEntry[name],
                        ...actionEntryImports
                    ]);
                }
            });
            for (const [name, actionEntryImports] of Object.entries(actionMapsPerClientEntry)){
                addedClientActionEntryList.push(this.injectActionEntry({
                    compiler,
                    compilation,
                    actions: actionEntryImports,
                    entryName: name,
                    bundlePath: name,
                    fromClient: true
                }));
            }
            return Promise.all(addedClientActionEntryList);
        });
        // After optimizing all the modules, we collect the CSS that are still used
        // by the certain chunk.
        compilation.hooks.afterOptimizeModules.tap(PLUGIN_NAME, ()=>{
            const cssImportsForChunk = {};
            const cssManifest = this.isEdgeServer ? pluginState.edgeServerCSSManifest : pluginState.serverCSSManifest;
            function collectModule(entryName, mod) {
                const resource = mod.resource;
                const modId = resource;
                if (modId) {
                    if ((0, _utils.isCSSMod)(mod)) {
                        cssImportsForChunk[entryName].add(modId);
                    }
                }
            }
            compilation.chunkGroups.forEach((chunkGroup)=>{
                chunkGroup.chunks.forEach((chunk)=>{
                    // Here we only track page chunks.
                    if (!chunk.name) return;
                    if (!chunk.name.endsWith("/page")) return;
                    const entryName = _path.default.join(this.appDir, "..", chunk.name);
                    if (!cssImportsForChunk[entryName]) {
                        cssImportsForChunk[entryName] = new Set();
                    }
                    const chunkModules = compilation.chunkGraph.getChunkModulesIterable(chunk);
                    for (const mod of chunkModules){
                        collectModule(entryName, mod);
                        const anyModule = mod;
                        if (anyModule.modules) {
                            anyModule.modules.forEach((concatenatedMod)=>{
                                collectModule(entryName, concatenatedMod);
                            });
                        }
                    }
                    const entryCSSInfo = cssManifest.cssModules || {};
                    entryCSSInfo[entryName] = [
                        ...cssImportsForChunk[entryName]
                    ];
                    cssManifest.cssModules = entryCSSInfo;
                });
            });
            (0, _utils1.forEachEntryModule)(compilation, ({ name , entryModule  })=>{
                const clientEntryDependencyMap = collectClientEntryDependencyMap(name);
                const tracked = new Set();
                for (const connection of compilation.moduleGraph.getOutgoingConnections(entryModule)){
                    const entryDependency = connection.dependency;
                    const entryRequest = connection.dependency.request;
                    // It is possible that the same entry is added multiple times in the
                    // connection graph. We can just skip these to speed up the process.
                    if (tracked.has(entryRequest)) continue;
                    tracked.add(entryRequest);
                    const { cssImports  } = this.collectComponentInfoFromDependencies({
                        entryRequest,
                        compilation,
                        dependency: entryDependency,
                        clientEntryDependencyMap
                    });
                    if (!cssManifest.cssImports) cssManifest.cssImports = {};
                    Object.assign(cssManifest.cssImports, cssImports);
                }
            });
        });
        compilation.hooks.processAssets.tap({
            name: PLUGIN_NAME,
            stage: _webpack.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_HASH
        }, (assets)=>{
            const data = {
                cssImports: {
                    ...pluginState.serverCSSManifest.cssImports,
                    ...pluginState.edgeServerCSSManifest.cssImports
                },
                cssModules: {
                    ...pluginState.serverCSSManifest.cssModules,
                    ...pluginState.edgeServerCSSManifest.cssModules
                }
            };
            const manifest = JSON.stringify(data, null, this.dev ? 2 : undefined);
            assets[`${this.assetPrefix}${_constants1.FLIGHT_SERVER_CSS_MANIFEST}.json`] = new _webpack.sources.RawSource(manifest);
            assets[`${this.assetPrefix}${_constants1.FLIGHT_SERVER_CSS_MANIFEST}.js`] = new _webpack.sources.RawSource("self.__RSC_CSS_MANIFEST=" + manifest);
        });
        // Invalidate in development to trigger recompilation
        const invalidator = (0, _ondemandentryhandler.getInvalidator)(compiler.outputPath);
        // Check if any of the entry injections need an invalidation
        if (invalidator && addClientEntryAndSSRModulesList.some(([shouldInvalidate])=>shouldInvalidate === true)) {
            invalidator.invalidate([
                _constants1.COMPILER_NAMES.client
            ]);
        }
        // Client compiler is invalidated before awaiting the compilation of the SSR client component entries
        // so that the client compiler is running in parallel to the server compiler.
        await Promise.all(addClientEntryAndSSRModulesList.map((addClientEntryAndSSRModules)=>addClientEntryAndSSRModules[1]));
        // Wait for action entries to be added.
        await Promise.all(addActionEntryList);
    }
    collectComponentInfoFromDependencies({ entryRequest , compilation , dependency , clientEntryDependencyMap  }) {
        /**
     * Keep track of checked modules to avoid infinite loops with recursive imports.
     */ const visitedBySegment = {};
        const clientComponentImports = [];
        const actionImports = [];
        const clientActionImports = [];
        const CSSImports = new Set();
        const filterClientComponents = (dependencyToFilter, inClientComponentBoundary)=>{
            var _mod_resourceResolveData, _mod_resourceResolveData1;
            const mod = compilation.moduleGraph.getResolvedModule(dependencyToFilter);
            if (!mod) return;
            const isCSS = (0, _utils.isCSSMod)(mod);
            // We have to always use the resolved request here to make sure the
            // server and client are using the same module path (required by RSC), as
            // the server compiler and client compiler have different resolve configs.
            const modRequest = ((_mod_resourceResolveData = mod.resourceResolveData) == null ? void 0 : _mod_resourceResolveData.path) + ((_mod_resourceResolveData1 = mod.resourceResolveData) == null ? void 0 : _mod_resourceResolveData1.query);
            // Ensure module is not walked again if it's already been visited
            if (!visitedBySegment[entryRequest]) {
                visitedBySegment[entryRequest] = new Set();
            }
            const storeKey = (inClientComponentBoundary ? "0" : "1") + ":" + modRequest;
            if (!modRequest || visitedBySegment[entryRequest].has(storeKey)) {
                return;
            }
            visitedBySegment[entryRequest].add(storeKey);
            const isClientComponent = (0, _utils.isClientComponentEntryModule)(mod);
            const actions = (0, _utils.getActions)(mod);
            if (actions) {
                if (isClientComponent) {
                    clientActionImports.push([
                        modRequest,
                        actions
                    ]);
                } else {
                    actionImports.push([
                        modRequest,
                        actions
                    ]);
                }
            }
            if (isCSS) {
                const sideEffectFree = mod.factoryMeta && mod.factoryMeta.sideEffectFree;
                if (sideEffectFree) {
                    const unused = !compilation.moduleGraph.getExportsInfo(mod).isModuleUsed(this.isEdgeServer ? _constants1.EDGE_RUNTIME_WEBPACK : "webpack-runtime");
                    if (unused) {
                        return;
                    }
                }
                CSSImports.add(modRequest);
            }
            // Check if request is for css file.
            if (!inClientComponentBoundary && isClientComponent || isCSS) {
                clientComponentImports.push(modRequest);
                // Here we are entering a client boundary, and we need to collect dependencies
                // in the client graph too.
                if (isClientComponent && clientEntryDependencyMap) {
                    if (clientEntryDependencyMap[modRequest]) {
                        filterClientComponents(clientEntryDependencyMap[modRequest], true);
                    }
                }
                return;
            }
            compilation.moduleGraph.getOutgoingConnections(mod).forEach((connection)=>{
                filterClientComponents(connection.dependency, inClientComponentBoundary || isClientComponent);
            });
        };
        // Don't traverse the module graph for the action loader.
        if (!/next-flight-action-entry-loader/.test(entryRequest)) {
            // Traverse the module graph to find all client components.
            filterClientComponents(dependency, false);
        }
        return {
            clientImports: clientComponentImports,
            cssImports: CSSImports.size ? {
                [entryRequest]: Array.from(CSSImports)
            } : {},
            actionImports,
            clientActionImports
        };
    }
    injectClientEntryAndSSRModules({ compiler , compilation , entryName , clientImports , bundlePath , absolutePagePath  }) {
        let shouldInvalidate = false;
        const loaderOptions = {
            modules: clientImports,
            server: false
        };
        // For the client entry, we always use the CJS build of Next.js. If the
        // server is using the ESM build (when using the Edge runtime), we need to
        // replace them.
        const clientLoader = `next-flight-client-entry-loader?${(0, _querystring.stringify)({
            modules: this.isEdgeServer ? clientImports.map((importPath)=>importPath.replace(/[\\/]next[\\/]dist[\\/]esm[\\/]/, "/next/dist/".replace(/\//g, _path.default.sep))) : clientImports,
            server: false
        })}!`;
        const clientSSRLoader = `next-flight-client-entry-loader?${(0, _querystring.stringify)({
            ...loaderOptions,
            server: true
        })}!`;
        // Add for the client compilation
        // Inject the entry to the client compiler.
        if (this.dev) {
            const entries = (0, _ondemandentryhandler.getEntries)(compiler.outputPath);
            const pageKey = (0, _ondemandentryhandler.getEntryKey)(_constants1.COMPILER_NAMES.client, "app", bundlePath);
            if (!entries[pageKey]) {
                entries[pageKey] = {
                    type: _ondemandentryhandler.EntryTypes.CHILD_ENTRY,
                    parentEntries: new Set([
                        entryName
                    ]),
                    absoluteEntryFilePath: absolutePagePath,
                    bundlePath,
                    request: clientLoader,
                    dispose: false,
                    lastActiveTime: Date.now()
                };
                shouldInvalidate = true;
            } else {
                const entryData = entries[pageKey];
                // New version of the client loader
                if (entryData.request !== clientLoader) {
                    entryData.request = clientLoader;
                    shouldInvalidate = true;
                }
                if (entryData.type === _ondemandentryhandler.EntryTypes.CHILD_ENTRY) {
                    entryData.parentEntries.add(entryName);
                }
                entryData.dispose = false;
                entryData.lastActiveTime = Date.now();
            }
        } else {
            pluginState.injectedClientEntries[bundlePath] = clientLoader;
        }
        // Inject the entry to the server compiler (__sc_client__).
        const clientComponentEntryDep = _webpack.webpack.EntryPlugin.createDependency(clientSSRLoader, {
            name: bundlePath
        });
        return [
            shouldInvalidate,
            // Add the dependency to the server compiler.
            // This promise is awaited later using `Promise.all` in order to parallelize adding the entries.
            // It ensures we can parallelize the SSR and Client compiler entries.
            this.addEntry(compilation, // Reuse compilation context.
            compiler.context, clientComponentEntryDep, {
                // By using the same entry name
                name: entryName,
                // Layer should be client for the SSR modules
                // This ensures the client components are bundled on client layer
                layer: _constants.WEBPACK_LAYERS.client
            })
        ];
    }
    injectActionEntry({ compiler , compilation , actions , entryName , bundlePath , fromClient  }) {
        const actionsArray = Array.from(actions.entries());
        const actionLoader = `next-flight-action-entry-loader?${(0, _querystring.stringify)({
            actions: JSON.stringify(actionsArray),
            __client_imported__: fromClient
        })}!`;
        const currentCompilerServerActions = this.isEdgeServer ? pluginState.edgeServerActions : pluginState.serverActions;
        for (const [p, names] of actionsArray){
            for (const name of names){
                const id = (0, _utils.generateActionId)(p, name);
                if (typeof currentCompilerServerActions[id] === "undefined") {
                    currentCompilerServerActions[id] = {
                        workers: {},
                        layer: {}
                    };
                }
                currentCompilerServerActions[id].workers[bundlePath] = "";
                currentCompilerServerActions[id].layer[bundlePath] = fromClient ? _constants.WEBPACK_LAYERS.action : _constants.WEBPACK_LAYERS.server;
            }
        }
        // Inject the entry to the server compiler
        const actionEntryDep = _webpack.webpack.EntryPlugin.createDependency(actionLoader, {
            name: bundlePath
        });
        return this.addEntry(compilation, // Reuse compilation context.
        compiler.context, actionEntryDep, {
            name: entryName,
            layer: fromClient ? _constants.WEBPACK_LAYERS.action : _constants.WEBPACK_LAYERS.server
        });
    }
    addEntry(compilation, context, dependency, options) /* Promise<module> */ {
        return new Promise((resolve, reject)=>{
            const entry = compilation.entries.get(options.name);
            entry.includeDependencies.push(dependency);
            compilation.hooks.addEntry.call(entry, options);
            compilation.addModuleTree({
                context,
                dependency,
                contextInfo: {
                    issuerLayer: options.layer
                }
            }, (err, module)=>{
                if (err) {
                    compilation.hooks.failedEntry.call(dependency, options, err);
                    return reject(err);
                }
                compilation.hooks.succeedEntry.call(dependency, options, module);
                return resolve(module);
            });
        });
    }
    createActionAssets(compilation, assets) {
        (0, _utils1.traverseModules)(compilation, (mod, _chunk, chunkGroup, modId)=>{
            // Go through all action entries and record the module ID for each entry.
            if (chunkGroup.name && mod.request && /next-flight-action-entry-loader/.test(mod.request)) {
                const fromClient = /&__client_imported__=true/.test(mod.request);
                const mapping = this.isEdgeServer ? pluginState.actionModEdgeServerId : pluginState.actionModServerId;
                if (!mapping[chunkGroup.name]) {
                    mapping[chunkGroup.name] = {};
                }
                mapping[chunkGroup.name][fromClient ? "client" : "server"] = modId;
            }
        });
        const serverActions = {};
        for(let id in pluginState.serverActions){
            const action = pluginState.serverActions[id];
            for(let name in action.workers){
                const modId = pluginState.actionModServerId[name][action.layer[name] === _constants.WEBPACK_LAYERS.action ? "client" : "server"];
                action.workers[name] = modId;
            }
            serverActions[id] = action;
        }
        const edgeServerActions = {};
        for(let id in pluginState.edgeServerActions){
            const action = pluginState.edgeServerActions[id];
            for(let name in action.workers){
                const modId = pluginState.actionModEdgeServerId[name][action.layer[name] === _constants.WEBPACK_LAYERS.action ? "client" : "server"];
                action.workers[name] = modId;
            }
            edgeServerActions[id] = action;
        }
        const json = JSON.stringify({
            node: serverActions,
            edge: edgeServerActions
        }, null, this.dev ? 2 : undefined);
        assets[`${this.assetPrefix}${_constants1.SERVER_REFERENCE_MANIFEST}.js`] = new _webpack.sources.RawSource("self.__RSC_SERVER_MANIFEST=" + json);
        assets[`${this.assetPrefix}${_constants1.SERVER_REFERENCE_MANIFEST}.json`] = new _webpack.sources.RawSource(json);
    }
}

//# sourceMappingURL=flight-client-entry-plugin.js.map