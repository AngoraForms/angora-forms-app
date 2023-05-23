"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouteHandlerManager", {
    enumerable: true,
    get: function() {
        return RouteHandlerManager;
    }
});
const _nodemoduleloader = require("../helpers/module-loader/node-module-loader");
const _routemoduleloader = require("../helpers/module-loader/route-module-loader");
const _nextrequest = require("../../web/spec-extension/adapters/next-request");
class RouteHandlerManager {
    constructor(moduleLoader = new _nodemoduleloader.NodeModuleLoader()){
        this.moduleLoader = moduleLoader;
    }
    async handle(match, req, context) {
        // The module supports minimal mode, load the minimal module.
        const module = await _routemoduleloader.RouteModuleLoader.load(match.definition.filename, this.moduleLoader);
        // Setup the handler. It is the responsibility of the module to ensure that
        // this is only called once. If this is in development mode, the require
        // cache will be cleared and the module will be re-created.
        module.setup();
        // Convert the BaseNextRequest to a NextRequest.
        const request = _nextrequest.NextRequestAdapter.fromBaseNextRequest(req);
        // Get the response from the handler and send it back.
        return await module.handle(request, context);
    }
}

//# sourceMappingURL=route-handler-manager.js.map