"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "genRenderExecArgv", {
    enumerable: true,
    get: function() {
        return genRenderExecArgv;
    }
});
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../../build/output/log"));
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
const genRenderExecArgv = ()=>{
    var _process_env_NODE_OPTIONS, _process_env_NODE_OPTIONS1;
    const isDebugging = process.execArgv.some((localArg)=>localArg.startsWith("--inspect")) || ((_process_env_NODE_OPTIONS = process.env.NODE_OPTIONS) == null ? void 0 : _process_env_NODE_OPTIONS.match == null ? void 0 : _process_env_NODE_OPTIONS.match(/--inspect(=\S+)?( |$)/));
    const isDebuggingWithBrk = process.execArgv.some((localArg)=>localArg.startsWith("--inspect-brk")) || ((_process_env_NODE_OPTIONS1 = process.env.NODE_OPTIONS) == null ? void 0 : _process_env_NODE_OPTIONS1.match == null ? void 0 : _process_env_NODE_OPTIONS1.match(/--inspect-brk(=\S+)?( |$)/));
    const debugPort = (()=>{
        var _process_execArgv_find, _process_env_NODE_OPTIONS, _process_env_NODE_OPTIONS_match;
        const debugPortStr = ((_process_execArgv_find = process.execArgv.find((localArg)=>localArg.startsWith("--inspect") || localArg.startsWith("--inspect-brk"))) == null ? void 0 : _process_execArgv_find.split("=")[1]) ?? ((_process_env_NODE_OPTIONS = process.env.NODE_OPTIONS) == null ? void 0 : _process_env_NODE_OPTIONS.match == null ? void 0 : (_process_env_NODE_OPTIONS_match = _process_env_NODE_OPTIONS.match(/--inspect(-brk)?(=(\S+))?( |$)/)) == null ? void 0 : _process_env_NODE_OPTIONS_match[3]);
        return debugPortStr ? parseInt(debugPortStr, 10) : 9229;
    })();
    if (isDebugging || isDebuggingWithBrk) {
        _log.warn(`the --inspect${isDebuggingWithBrk ? "-brk" : ""} option was detected, the Next.js server should be inspected at port ${debugPort + 1}.`);
    }
    const execArgv = process.execArgv.filter((localArg)=>{
        return !localArg.startsWith("--inspect") && !localArg.startsWith("--inspect-brk");
    });
    if (isDebugging || isDebuggingWithBrk) {
        execArgv.push(`--inspect${isDebuggingWithBrk ? "-brk" : ""}=${debugPort + 1}`);
    }
    return execArgv;
};

//# sourceMappingURL=worker-utils.js.map