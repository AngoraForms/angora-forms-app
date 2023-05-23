"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "invokeRequest", {
    enumerable: true,
    get: function() {
        return invokeRequest;
    }
});
const _utils = require("./utils");
const invokeRequest = async (targetUrl, requestInit, readableBody)=>{
    const parsedUrl = new URL(targetUrl);
    // force localhost to IPv4 as some DNS may
    // resolve to IPv6 instead
    if (parsedUrl.hostname === "localhost") {
        parsedUrl.hostname = "127.0.0.1";
    }
    const invokeHeaders = (0, _utils.filterReqHeaders)({
        ...requestInit.headers
    });
    const invokeRes = await new Promise((resolveInvoke, rejectInvoke)=>{
        const http = require("http");
        try {
            const invokeReq = http.request(targetUrl, {
                headers: invokeHeaders,
                method: requestInit.method
            }, (res)=>{
                resolveInvoke(res);
            });
            invokeReq.on("error", (err)=>{
                rejectInvoke(err);
            });
            if (requestInit.method !== "GET" && requestInit.method !== "HEAD") {
                if (readableBody) {
                    readableBody.pipe(invokeReq);
                    readableBody.on("close", ()=>{
                        invokeReq.end();
                    });
                }
            } else {
                invokeReq.end();
            }
        } catch (err) {
            rejectInvoke(err);
        }
    });
    return invokeRes;
};

//# sourceMappingURL=invoke-request.js.map