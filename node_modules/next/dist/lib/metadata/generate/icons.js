"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IconsMetadata", {
    enumerable: true,
    get: function() {
        return IconsMetadata;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function IconDescriptorLink({ icon  }) {
    const { url , rel ="icon" , ...props } = icon;
    return /*#__PURE__*/ _react.default.createElement("link", {
        rel: rel,
        href: url.toString(),
        ...props
    });
}
function IconLink({ rel , icon  }) {
    if (typeof icon === "object" && !(icon instanceof URL)) {
        if (!icon.rel && rel) icon.rel = rel;
        return /*#__PURE__*/ _react.default.createElement(IconDescriptorLink, {
            icon: icon
        });
    } else {
        const href = icon.toString();
        return /*#__PURE__*/ _react.default.createElement("link", {
            rel: rel,
            href: href
        });
    }
}
function IconsMetadata({ icons  }) {
    if (!icons) return null;
    const shortcutList = icons.shortcut;
    const iconList = icons.icon;
    const appleList = icons.apple;
    const otherList = icons.other;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, shortcutList ? shortcutList.map((icon, index)=>/*#__PURE__*/ _react.default.createElement(IconLink, {
            key: `shortcut-${index}`,
            rel: "shortcut icon",
            icon: icon
        })) : null, iconList ? iconList.map((icon, index)=>/*#__PURE__*/ _react.default.createElement(IconLink, {
            key: `shortcut-${index}`,
            rel: "icon",
            icon: icon
        })) : null, appleList ? appleList.map((icon, index)=>/*#__PURE__*/ _react.default.createElement(IconLink, {
            key: `apple-${index}`,
            rel: "apple-touch-icon",
            icon: icon
        })) : null, otherList ? otherList.map((icon, index)=>/*#__PURE__*/ _react.default.createElement(IconDescriptorLink, {
            key: `other-${index}`,
            icon: icon
        })) : null);
}

//# sourceMappingURL=icons.js.map