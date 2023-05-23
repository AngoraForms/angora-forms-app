import * as Log from "../../build/output/log";
export const genRenderExecArgv = ()=>{
    var _process_env_NODE_OPTIONS, _process_env_NODE_OPTIONS1;
    const isDebugging = process.execArgv.some((localArg)=>localArg.startsWith("--inspect")) || ((_process_env_NODE_OPTIONS = process.env.NODE_OPTIONS) == null ? void 0 : _process_env_NODE_OPTIONS.match == null ? void 0 : _process_env_NODE_OPTIONS.match(/--inspect(=\S+)?( |$)/));
    const isDebuggingWithBrk = process.execArgv.some((localArg)=>localArg.startsWith("--inspect-brk")) || ((_process_env_NODE_OPTIONS1 = process.env.NODE_OPTIONS) == null ? void 0 : _process_env_NODE_OPTIONS1.match == null ? void 0 : _process_env_NODE_OPTIONS1.match(/--inspect-brk(=\S+)?( |$)/));
    const debugPort = (()=>{
        var _process_execArgv_find, _process_env_NODE_OPTIONS, _process_env_NODE_OPTIONS_match;
        const debugPortStr = ((_process_execArgv_find = process.execArgv.find((localArg)=>localArg.startsWith("--inspect") || localArg.startsWith("--inspect-brk"))) == null ? void 0 : _process_execArgv_find.split("=")[1]) ?? ((_process_env_NODE_OPTIONS = process.env.NODE_OPTIONS) == null ? void 0 : _process_env_NODE_OPTIONS.match == null ? void 0 : (_process_env_NODE_OPTIONS_match = _process_env_NODE_OPTIONS.match(/--inspect(-brk)?(=(\S+))?( |$)/)) == null ? void 0 : _process_env_NODE_OPTIONS_match[3]);
        return debugPortStr ? parseInt(debugPortStr, 10) : 9229;
    })();
    if (isDebugging || isDebuggingWithBrk) {
        Log.warn(`the --inspect${isDebuggingWithBrk ? "-brk" : ""} option was detected, the Next.js server should be inspected at port ${debugPort + 1}.`);
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