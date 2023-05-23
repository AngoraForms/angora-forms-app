"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return transformSource;
    }
});
const _constants = require("../../../shared/lib/constants");
const _getmodulebuildinfo = require("./get-module-build-info");
const _utils = require("./utils");
async function transformSource() {
    let { modules , server  } = this.getOptions();
    const isServer = server === "true";
    if (!Array.isArray(modules)) {
        modules = modules ? [
            modules
        ] : [];
    }
    const requests = modules;
    const code = requests// Filter out CSS files in the SSR compilation
    .filter((request)=>isServer ? !_utils.regexCSS.test(request) : true).map((request)=>`import(/* webpackMode: "eager" */ ${JSON.stringify(request)})`).join(";\n");
    const buildInfo = (0, _getmodulebuildinfo.getModuleBuildInfo)(this._module);
    const resolve = this.getResolve();
    // Resolve to absolute resource url for flight manifest to collect and use to determine client components
    const resolvedRequests = await Promise.all(requests.map(async (r)=>await resolve(this.rootContext, r)));
    buildInfo.rsc = {
        type: _constants.RSC_MODULE_TYPES.client,
        requests: resolvedRequests
    };
    return code;
}

//# sourceMappingURL=next-flight-client-entry-loader.js.map