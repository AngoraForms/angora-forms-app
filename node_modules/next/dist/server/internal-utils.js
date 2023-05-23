"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    stripInternalQueries: null,
    stripInternalSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    stripInternalQueries: function() {
        return stripInternalQueries;
    },
    stripInternalSearchParams: function() {
        return stripInternalSearchParams;
    }
});
const INTERNAL_QUERY_NAMES = [
    "__nextFallback",
    "__nextLocale",
    "__nextInferredLocaleFromDefault",
    "__nextDefaultLocale",
    "__nextIsNotFound"
];
const EXTENDED_INTERNAL_QUERY_NAMES = [
    "__nextDataReq"
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(searchParams, extended) {
    for (const name of INTERNAL_QUERY_NAMES){
        searchParams.delete(name);
    }
    if (extended) {
        for (const name of EXTENDED_INTERNAL_QUERY_NAMES){
            searchParams.delete(name);
        }
    }
    return searchParams;
}

//# sourceMappingURL=internal-utils.js.map