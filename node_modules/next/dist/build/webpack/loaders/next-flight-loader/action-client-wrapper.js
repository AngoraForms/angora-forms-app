// This file must be bundled in the app's client layer, it shouldn't be directly
// imported by the server.
// eslint-disable-next-line import/no-extraneous-dependencies
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // A noop wrapper to let the Flight client create the server reference.
// See also: https://github.com/facebook/react/pull/26632
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _client = require("react-server-dom-webpack/client");
const _appcallserver = require("next/dist/client/app-call-server");
function _default(id) {
    return (0, _client.createServerReference)(id, _appcallserver.callServer);
}

//# sourceMappingURL=action-client-wrapper.js.map