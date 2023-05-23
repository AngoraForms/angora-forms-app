"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getSocialImageFallbackMetadataBase: null,
    isStringOrURL: null,
    resolveUrl: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSocialImageFallbackMetadataBase: function() {
        return getSocialImageFallbackMetadataBase;
    },
    isStringOrURL: function() {
        return isStringOrURL;
    },
    resolveUrl: function() {
        return resolveUrl;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("../../../shared/lib/isomorphic/path"));
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../../../build/output/log"));
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
function isStringOrURL(icon) {
    return typeof icon === "string" || icon instanceof URL;
}
function createLocalMetadataBase() {
    return new URL(`http://localhost:${process.env.PORT || 3000}`);
}
function getSocialImageFallbackMetadataBase(metadataBase) {
    const isMetadataBaseMissing = !metadataBase;
    const defaultMetadataBase = createLocalMetadataBase();
    const deploymentUrl = process.env.VERCEL_URL && new URL(`https://${process.env.VERCEL_URL}`);
    let fallbackMetadata;
    if (process.env.NODE_ENV === "development") {
        fallbackMetadata = defaultMetadataBase;
    } else {
        fallbackMetadata = process.env.NODE_ENV === "production" && deploymentUrl && process.env.VERCEL_ENV === "preview" ? deploymentUrl : metadataBase || deploymentUrl || defaultMetadataBase;
    }
    if (isMetadataBaseMissing) {
        // Add new line to warning for worker output
        console.log();
        _log.warnOnce(`metadata.metadataBase is not set for resolving social open graph or twitter images, fallbacks to "${fallbackMetadata.origin}". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase`);
    }
    return fallbackMetadata;
}
function resolveUrl(url, metadataBase) {
    if (url instanceof URL) return url;
    if (!url) return null;
    try {
        // If we can construct a URL instance from url, ignore metadataBase
        const parsedUrl = new URL(url);
        return parsedUrl;
    } catch (_) {}
    if (!metadataBase) {
        metadataBase = createLocalMetadataBase();
    }
    // Handle relative or absolute paths
    const basePath = metadataBase.pathname || "";
    const joinedPath = _path.default.join(basePath, url);
    return new URL(joinedPath, metadataBase);
}

//# sourceMappingURL=resolve-url.js.map