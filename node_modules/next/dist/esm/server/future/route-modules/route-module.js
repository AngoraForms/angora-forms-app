// These are imported weirdly like this because of the way that the bundling
// works. We need to import the built files from the dist directory, but we
// can't do that directly because we need types from the source files. So we
// import the types from the source files and then import the built files.
const { requestAsyncStorage  } = require("next/dist/client/components/request-async-storage");
const { staticGenerationAsyncStorage  } = require("next/dist/client/components/static-generation-async-storage");
const serverHooks = require("next/dist/client/components/hooks-server-context");
const headerHooks = require("next/dist/client/components/headers");
const { staticGenerationBailout  } = require("next/dist/client/components/static-generation-bailout");
const { actionAsyncStorage  } = require("next/dist/client/components/action-async-storage");
/**
 * RouteModule is the base class for all route modules. This class should be
 * extended by all route modules.
 */ export class RouteModule {
    constructor({ userland  }){
        /**
   * A reference to the request async storage.
   */ this.requestAsyncStorage = requestAsyncStorage;
        /**
   * A reference to the static generation async storage.
   */ this.staticGenerationAsyncStorage = staticGenerationAsyncStorage;
        /**
   * An interface to call server hooks which interact with the underlying
   * storage.
   */ this.serverHooks = serverHooks;
        /**
   * An interface to call header hooks which interact with the underlying
   * request storage.
   */ this.headerHooks = headerHooks;
        /**
   * An interface to call static generation bailout hooks which interact with
   * the underlying static generation storage.
   */ this.staticGenerationBailout = staticGenerationBailout;
        /**
   * A reference to the mutation related async storage, such as mutations of
   * cookies.
   */ this.actionAsyncStorage = actionAsyncStorage;
        this.userland = userland;
    }
}

//# sourceMappingURL=route-module.js.map