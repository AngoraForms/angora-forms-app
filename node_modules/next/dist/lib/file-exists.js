"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fileExists", {
    enumerable: true,
    get: function() {
        return fileExists;
    }
});
const _fs = require("fs");
const _iserror = /*#__PURE__*/ _interop_require_default(require("./is-error"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function fileExists(fileName, type) {
    try {
        if (type === "file") {
            const stats = await _fs.promises.stat(fileName);
            return stats.isFile();
        } else if (type === "directory") {
            const stats = await _fs.promises.stat(fileName);
            return stats.isDirectory();
        } else {
            await _fs.promises.access(fileName, _fs.constants.F_OK);
        }
        return true;
    } catch (err) {
        if ((0, _iserror.default)(err) && (err.code === "ENOENT" || err.code === "ENAMETOOLONG")) {
            return false;
        }
        throw err;
    }
}

//# sourceMappingURL=file-exists.js.map