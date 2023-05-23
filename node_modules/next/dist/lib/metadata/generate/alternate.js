"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AlternatesMetadata", {
    enumerable: true,
    get: function() {
        return AlternatesMetadata;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function AlternateLink({ descriptor , ...props }) {
    if (!descriptor.url) return null;
    return /*#__PURE__*/ _react.default.createElement("link", {
        ...props,
        ...descriptor.title && {
            title: descriptor.title
        },
        href: descriptor.url.toString()
    });
}
function AlternatesMetadata({ alternates  }) {
    if (!alternates) return null;
    const { canonical , languages , media , types  } = alternates;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, canonical ? /*#__PURE__*/ _react.default.createElement(AlternateLink, {
        rel: "canonical",
        descriptor: canonical
    }) : null, languages ? Object.entries(languages).map(([locale, descriptors])=>{
        return descriptors == null ? void 0 : descriptors.map((descriptor, index)=>/*#__PURE__*/ _react.default.createElement(AlternateLink, {
                rel: "alternate",
                key: index,
                hrefLang: locale,
                descriptor: descriptor
            }));
    }) : null, media ? Object.entries(media).map(([mediaName, descriptors])=>{
        return descriptors == null ? void 0 : descriptors.map((descriptor, index)=>/*#__PURE__*/ _react.default.createElement(AlternateLink, {
                rel: "alternate",
                key: index,
                media: mediaName,
                descriptor: descriptor
            }));
    }) : null, types ? Object.entries(types).map(([type, descriptors])=>{
        return descriptors == null ? void 0 : descriptors.map((descriptor, index)=>/*#__PURE__*/ _react.default.createElement(AlternateLink, {
                rel: "alternate",
                key: index,
                type: type,
                descriptor: descriptor
            }));
    }) : null);
}

//# sourceMappingURL=alternate.js.map