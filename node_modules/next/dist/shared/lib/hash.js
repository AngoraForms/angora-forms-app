// http://www.cse.yorku.ca/~oz/hash.html
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "djb2Hash", {
    enumerable: true,
    get: function() {
        return djb2Hash;
    }
});
function djb2Hash(str) {
    let hash = 5381;
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) + hash + char;
    }
    return Math.abs(hash);
}

//# sourceMappingURL=hash.js.map