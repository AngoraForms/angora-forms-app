"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createServerHandler", {
    enumerable: true,
    get: function() {
        return createServerHandler;
    }
});
const _httpproxy = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/http-proxy"));
const _jestworker = require("next/dist/compiled/jest-worker");
const _utils = require("../../shared/lib/utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const renderServerPath = require.resolve("./render-server");
const createServerHandler = async ({ port , hostname , dir , dev =false , minimalMode  })=>{
    var _routerWorker__workerPool;
    const routerWorker = new _jestworker.Worker(renderServerPath, {
        numWorkers: 1,
        maxRetries: 10,
        forkOptions: {
            env: {
                FORCE_COLOR: "1",
                ...process.env
            }
        },
        exposedMethods: [
            "initialize"
        ]
    });
    let didInitialize = false;
    for (const _worker of ((_routerWorker__workerPool = routerWorker._workerPool) == null ? void 0 : _routerWorker__workerPool._workers) || []){
        // eslint-disable-next-line no-loop-func
        _worker._child.on("exit", (code, signal)=>{
            // catch failed initializing without retry
            if ((code || signal) && !didInitialize) {
                routerWorker == null ? void 0 : routerWorker.end();
                process.exit(1);
            }
        });
    }
    const workerStdout = routerWorker.getStdout();
    const workerStderr = routerWorker.getStderr();
    workerStdout.on("data", (data)=>{
        process.stdout.write(data);
    });
    workerStderr.on("data", (data)=>{
        process.stderr.write(data);
    });
    const { port: routerPort  } = await routerWorker.initialize({
        dir,
        port,
        dev,
        hostname,
        minimalMode,
        workerType: "router"
    });
    didInitialize = true;
    const getProxyServer = (pathname)=>{
        const targetUrl = `http://${hostname}:${routerPort}${pathname}`;
        const proxyServer = _httpproxy.default.createProxy({
            target: targetUrl,
            changeOrigin: false,
            ignorePath: true,
            xfwd: true,
            ws: true,
            followRedirects: false
        });
        return proxyServer;
    };
    // proxy to router worker
    return async (req, res)=>{
        const urlParts = (req.url || "").split("?");
        const urlNoQuery = urlParts[0];
        // this normalizes repeated slashes in the path e.g. hello//world ->
        // hello/world or backslashes to forward slashes, this does not
        // handle trailing slash as that is handled the same as a next.config.js
        // redirect
        if (urlNoQuery == null ? void 0 : urlNoQuery.match(/(\\|\/\/)/)) {
            const cleanUrl = (0, _utils.normalizeRepeatedSlashes)(req.url);
            res.statusCode = 308;
            res.setHeader("Location", cleanUrl);
            res.end(cleanUrl);
            return;
        }
        const proxyServer = getProxyServer(req.url || "/");
        proxyServer.web(req, res);
        proxyServer.on("error", (err)=>{
            res.statusCode = 500;
            res.end("Internal Server Error");
            console.error(err);
        });
    };
};

//# sourceMappingURL=render-server-standalone.js.map