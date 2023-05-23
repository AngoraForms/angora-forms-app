"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    encodeMatchers: null,
    decodeMatchers: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    encodeMatchers: function() {
        return encodeMatchers;
    },
    decodeMatchers: function() {
        return decodeMatchers;
    },
    default: function() {
        return middlewareLoader;
    }
});
const _getmodulebuildinfo = require("./get-module-build-info");
const _stringifyrequest = require("../stringify-request");
const _constants = require("../../../lib/constants");
function encodeMatchers(matchers) {
    return Buffer.from(JSON.stringify(matchers)).toString("base64");
}
function decodeMatchers(encodedMatchers) {
    return JSON.parse(Buffer.from(encodedMatchers, "base64").toString());
}
function middlewareLoader() {
    const { absolutePagePath , page , rootDir , matchers: encodedMatchers  } = this.getOptions();
    const matchers = encodedMatchers ? decodeMatchers(encodedMatchers) : undefined;
    const stringifiedPagePath = (0, _stringifyrequest.stringifyRequest)(this, absolutePagePath);
    const buildInfo = (0, _getmodulebuildinfo.getModuleBuildInfo)(this._module);
    buildInfo.nextEdgeMiddleware = {
        matchers,
        page: page.replace(new RegExp(`/${_constants.MIDDLEWARE_LOCATION_REGEXP}$`), "") || "/"
    };
    buildInfo.rootDir = rootDir;
    return `
        import { adapter, enhanceGlobals } from 'next/dist/esm/server/web/adapter'

        enhanceGlobals()

        var mod = require(${stringifiedPagePath})
        var handler = mod.middleware || mod.default;

        if (typeof handler !== 'function') {
          throw new Error('The Middleware "pages${page}" must export a \`middleware\` or a \`default\` function');
        }

        export default function (opts) {
          return adapter({
              ...opts,
              page: ${JSON.stringify(page)},
              handler,
          })
        }
    `;
}

//# sourceMappingURL=next-middleware-loader.js.map