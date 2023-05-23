"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    printAndExit: null,
    genExecArgv: null,
    getNodeOptionsWithoutInspect: null,
    getPort: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    printAndExit: function() {
        return printAndExit;
    },
    genExecArgv: function() {
        return genExecArgv;
    },
    getNodeOptionsWithoutInspect: function() {
        return getNodeOptionsWithoutInspect;
    },
    getPort: function() {
        return getPort;
    }
});
function printAndExit(message, code = 1) {
    if (code === 0) {
        console.log(message);
    } else {
        console.error(message);
    }
    process.exit(code);
}
const genExecArgv = (enabled, debugPort)=>{
    const execArgv = process.execArgv.filter((localArg)=>{
        return !localArg.startsWith("--inspect") && !localArg.startsWith("--inspect-brk");
    });
    if (enabled) {
        execArgv.push(`--inspect${enabled === "brk" ? "-brk" : ""}=${debugPort + 1}`);
    }
    return execArgv;
};
function getNodeOptionsWithoutInspect() {
    const NODE_INSPECT_RE = /--inspect(-brk)?(=\S+)?( |$)/;
    return (process.env.NODE_OPTIONS || "").replace(NODE_INSPECT_RE, "");
}
function getPort(args) {
    if (typeof args["--port"] === "number") {
        return args["--port"];
    }
    const parsed = process.env.PORT && parseInt(process.env.PORT, 10);
    if (typeof parsed === "number" && !Number.isNaN(parsed)) {
        return parsed;
    }
    return 3000;
}

//# sourceMappingURL=utils.js.map