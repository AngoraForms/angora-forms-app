/**
 * Polyfills `FormData` and `Blob` in the Node.js runtime.
 */ if (!global.FormData) {
    const { FormData  } = require("next/dist/compiled/@edge-runtime/primitives/fetch");
    global.FormData = FormData;
}
if (!global.Blob) {
    const { Blob  } = require("next/dist/compiled/@edge-runtime/primitives/blob");
    global.Blob = Blob;
}

//# sourceMappingURL=node-polyfill-form.js.map