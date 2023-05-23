"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    WORKER_SELF_EXIT_CODE: null,
    clearModuleContext: null,
    deleteAppClientCache: null,
    deleteCache: null,
    initialize: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    WORKER_SELF_EXIT_CODE: function() {
        return WORKER_SELF_EXIT_CODE;
    },
    clearModuleContext: function() {
        return clearModuleContext;
    },
    deleteAppClientCache: function() {
        return deleteAppClientCache;
    },
    deleteCache: function() {
        return deleteCache;
    },
    initialize: function() {
        return initialize;
    }
});
const _v8 = /*#__PURE__*/ _interop_require_default(require("v8"));
const _http = /*#__PURE__*/ _interop_require_default(require("http"));
const _net = require("net");
require("../require-hook");
const _next = /*#__PURE__*/ _interop_require_default(require("../next"));
const _log = require("../../build/output/log");
const _nextjsrequirecachehotreloader = require("../../build/webpack/plugins/nextjs-require-cache-hot-reloader");
const _context = require("../web/sandbox/context");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const WORKER_SELF_EXIT_CODE = 77;
const MAXIMUM_HEAP_SIZE_ALLOWED = _v8.default.getHeapStatistics().heap_size_limit / 1024 / 1024 * 0.9;
let result;
function clearModuleContext(target, content) {
    (0, _context.clearModuleContext)(target, content);
}
function deleteAppClientCache() {
    (0, _nextjsrequirecachehotreloader.deleteAppClientCache)();
}
function deleteCache(filePath) {
    (0, _nextjsrequirecachehotreloader.deleteCache)(filePath);
}
async function initialize(opts) {
    // if we already setup the server return as we only need to do
    // this on first worker boot
    if (result) {
        return result;
    }
    let requestHandler;
    const server = _http.default.createServer((req, res)=>{
        return requestHandler(req, res).catch((err)=>{
            res.statusCode = 500;
            res.end("Internal Server Error");
            console.error(err);
        }).finally(()=>{
            if (process.memoryUsage().heapUsed / 1024 / 1024 > MAXIMUM_HEAP_SIZE_ALLOWED) {
                (0, _log.warn)("The server is running out of memory, restarting to free up memory.");
                server.close();
                process.exit(WORKER_SELF_EXIT_CODE);
            }
        });
    });
    if (opts.keepAliveTimeout) {
        server.keepAliveTimeout = opts.keepAliveTimeout;
    }
    return new Promise((resolve, reject)=>{
        server.on("error", (err)=>{
            console.error(`Invariant: failed to start render worker`, err);
            process.exit(1);
        });
        let upgradeHandler;
        if (!opts.dev) {
            server.on("upgrade", (req, socket, upgrade)=>{
                upgradeHandler(req, socket, upgrade);
            });
        }
        server.on("listening", async ()=>{
            try {
                const addr = server.address();
                const port = addr && typeof addr === "object" ? addr.port : 0;
                if (!port) {
                    console.error(`Invariant failed to detect render worker port`, addr);
                    process.exit(1);
                }
                let hostname = !opts.hostname || opts.hostname === "0.0.0.0" ? "localhost" : opts.hostname;
                if ((0, _net.isIPv6)(hostname)) {
                    hostname = hostname === "::" ? "[::1]" : `[${hostname}]`;
                }
                result = {
                    port,
                    hostname
                };
                const app = (0, _next.default)({
                    ...opts,
                    _routerWorker: opts.workerType === "router",
                    _renderWorker: opts.workerType === "render",
                    hostname,
                    customServer: false,
                    httpServer: server,
                    port: opts.port
                });
                requestHandler = app.getRequestHandler();
                upgradeHandler = app.getUpgradeHandler();
                await app.prepare();
                resolve(result);
            } catch (err) {
                return reject(err);
            }
        });
        server.listen(0, opts.hostname);
    });
}

//# sourceMappingURL=render-server.js.map