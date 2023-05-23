#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nextInfo", {
    enumerable: true,
    get: function() {
        return nextInfo;
    }
});
const _os = /*#__PURE__*/ _interop_require_default(require("os"));
const _child_process = /*#__PURE__*/ _interop_require_default(require("child_process"));
const _chalk = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/chalk"));
const _index = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/arg/index.js"));
const _utils = require("../server/lib/utils");
const _iserror = /*#__PURE__*/ _interop_require_default(require("../lib/is-error"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { fetch  } = require("next/dist/compiled/undici");
function getPackageVersion(packageName) {
    try {
        return require(`${packageName}/package.json`).version;
    } catch  {
        return "N/A";
    }
}
function getBinaryVersion(binaryName) {
    try {
        return _child_process.default.execFileSync(binaryName, [
            "--version"
        ]).toString().trim();
    } catch  {
        return "N/A";
    }
}
const nextInfo = async (argv)=>{
    const validArgs = {
        // Types
        "--help": Boolean,
        // Aliases
        "-h": "--help"
    };
    let args;
    try {
        args = (0, _index.default)(validArgs, {
            argv
        });
    } catch (error) {
        if ((0, _iserror.default)(error) && error.code === "ARG_UNKNOWN_OPTION") {
            return (0, _utils.printAndExit)(error.message, 1);
        }
        throw error;
    }
    if (args["--help"]) {
        console.log(`
      Description
        Prints relevant details about the current system which can be used to report Next.js bugs

      Usage
        $ next info

      Learn more: ${_chalk.default.cyan("https://nextjs.org/docs/api-reference/cli#info")}`);
        return;
    }
    const installedRelease = getPackageVersion("next");
    console.log(`
    Operating System:
      Platform: ${_os.default.platform()}
      Arch: ${_os.default.arch()}
      Version: ${_os.default.version()}
    Binaries:
      Node: ${process.versions.node}
      npm: ${getBinaryVersion("npm")}
      Yarn: ${getBinaryVersion("yarn")}
      pnpm: ${getBinaryVersion("pnpm")}
    Relevant packages:
      next: ${installedRelease}
      eslint-config-next: ${getPackageVersion("eslint-config-next")}
      react: ${getPackageVersion("react")}
      react-dom: ${getPackageVersion("react-dom")}
      typescript: ${getPackageVersion("typescript")}
`);
    try {
        const res = await fetch("https://api.github.com/repos/vercel/next.js/releases");
        const releases = await res.json();
        const newestRelease = releases[0].tag_name.replace(/^v/, "");
        if (installedRelease !== newestRelease) {
            console.warn(`${_chalk.default.yellow(_chalk.default.bold("warn"))}  - Latest canary version not detected, detected: "${installedRelease}", newest: "${newestRelease}".
        Please try the latest canary version (\`npm install next@canary\`) to confirm the issue still exists before creating a new issue.
        Read more - https://nextjs.org/docs/messages/opening-an-issue`);
        }
    } catch (e) {
        console.warn(`${_chalk.default.yellow(_chalk.default.bold("warn"))}  - Failed to fetch latest canary version. (Reason: ${e.message}.)
      Detected "${installedRelease}". Visit https://github.com/vercel/next.js/releases.
      Make sure to try the latest canary version (eg.: \`npm install next@canary\`) to confirm the issue still exists before creating a new issue.
      Read more - https://nextjs.org/docs/messages/opening-an-issue`);
    }
};

//# sourceMappingURL=next-info.js.map