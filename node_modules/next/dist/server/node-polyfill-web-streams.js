// Polyfill Web Streams for the Node.js runtime.
"use strict";
if (!global.ReadableStream) {
    const { ReadableStream  } = require("next/dist/compiled/@edge-runtime/primitives/streams");
    global.ReadableStream = ReadableStream;
}
if (!global.TransformStream) {
    const { TransformStream  } = require("next/dist/compiled/@edge-runtime/primitives/streams");
    global.TransformStream = TransformStream;
}

//# sourceMappingURL=node-polyfill-web-streams.js.map