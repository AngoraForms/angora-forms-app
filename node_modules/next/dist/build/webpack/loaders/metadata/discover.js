"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    METADATA_RESOURCE_QUERY: null,
    createStaticMetadataFromRoute: null,
    createMetadataExportsCode: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    METADATA_RESOURCE_QUERY: function() {
        return METADATA_RESOURCE_QUERY;
    },
    createStaticMetadataFromRoute: function() {
        return createStaticMetadataFromRoute;
    },
    createMetadataExportsCode: function() {
        return createMetadataExportsCode;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _querystring = require("querystring");
const _ismetadataroute = require("../../../../lib/metadata/is-metadata-route");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const METADATA_TYPE = "metadata";
const METADATA_RESOURCE_QUERY = "?__next_metadata";
// Produce all compositions with filename (icon, apple-icon, etc.) with extensions (png, jpg, etc.)
async function enumMetadataFiles(dir, filename, extensions, { resolvePath , loaderContext , // When set to true, possible filename without extension could: icon, icon0, ..., icon9
numericSuffix  }) {
    const collectedFiles = [];
    const possibleFileNames = [
        filename
    ].concat(numericSuffix ? Array(10).fill(0).map((_, index)=>filename + index) : []);
    for (const name of possibleFileNames){
        for (const ext of extensions){
            const pathname = _path.default.join(dir, `${name}.${ext}`);
            try {
                const resolved = await resolvePath(pathname);
                loaderContext.addDependency(resolved);
                collectedFiles.push(resolved);
            } catch (err) {
                if (!err.message.includes("Can't resolve")) {
                    throw err;
                }
                loaderContext.addMissingDependency(pathname);
            }
        }
    }
    return collectedFiles;
}
async function createStaticMetadataFromRoute(resolvedDir, { segment , resolvePath , isRootLayoutOrRootPage , loaderContext , pageExtensions , basePath  }) {
    let hasStaticMetadataFiles = false;
    const staticImagesMetadata = {
        icon: [],
        apple: [],
        twitter: [],
        openGraph: [],
        manifest: undefined
    };
    const opts = {
        resolvePath,
        loaderContext
    };
    async function collectIconModuleIfExists(type) {
        if (type === "manifest") {
            const staticManifestExtension = [
                "webmanifest",
                "json"
            ];
            const manifestFile = await enumMetadataFiles(resolvedDir, "manifest", staticManifestExtension.concat(pageExtensions), {
                ...opts,
                numericSuffix: false
            });
            if (manifestFile.length > 0) {
                hasStaticMetadataFiles = true;
                const { name , ext  } = _path.default.parse(manifestFile[0]);
                const extension = staticManifestExtension.includes(ext.slice(1)) ? ext.slice(1) : "webmanifest";
                staticImagesMetadata.manifest = JSON.stringify(`/${name}.${extension}`);
            }
            return;
        }
        const resolvedMetadataFiles = await enumMetadataFiles(resolvedDir, _ismetadataroute.STATIC_METADATA_IMAGES[type].filename, [
            ..._ismetadataroute.STATIC_METADATA_IMAGES[type].extensions,
            ...type === "favicon" ? [] : pageExtensions
        ], {
            ...opts,
            numericSuffix: true
        });
        resolvedMetadataFiles.sort((a, b)=>a.localeCompare(b)).forEach((filepath)=>{
            const imageModuleImportSource = `next-metadata-image-loader?${(0, _querystring.stringify)({
                type,
                segment,
                basePath,
                pageExtensions
            })}!${filepath}${METADATA_RESOURCE_QUERY}`;
            const imageModule = `(async (props) => (await import(/* webpackMode: "eager" */ ${JSON.stringify(imageModuleImportSource)})).default(props))`;
            hasStaticMetadataFiles = true;
            if (type === "favicon") {
                staticImagesMetadata.icon.unshift(imageModule);
            } else {
                staticImagesMetadata[type].push(imageModule);
            }
        });
    }
    await Promise.all([
        collectIconModuleIfExists("icon"),
        collectIconModuleIfExists("apple"),
        collectIconModuleIfExists("openGraph"),
        collectIconModuleIfExists("twitter"),
        isRootLayoutOrRootPage && collectIconModuleIfExists("favicon"),
        isRootLayoutOrRootPage && collectIconModuleIfExists("manifest")
    ]);
    return hasStaticMetadataFiles ? staticImagesMetadata : null;
}
function createMetadataExportsCode(metadata) {
    return metadata ? `${METADATA_TYPE}: {
    icon: [${metadata.icon.join(",")}],
    apple: [${metadata.apple.join(",")}],
    openGraph: [${metadata.openGraph.join(",")}],
    twitter: [${metadata.twitter.join(",")}],
    manifest: ${metadata.manifest ? metadata.manifest : "undefined"}
  }` : "";
}

//# sourceMappingURL=discover.js.map