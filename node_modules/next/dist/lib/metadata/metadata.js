"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataTree", {
    enumerable: true,
    get: function() {
        return MetadataTree;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _basic = require("./generate/basic");
const _alternate = require("./generate/alternate");
const _opengraph = require("./generate/opengraph");
const _icons = require("./generate/icons");
const _resolvemetadata = require("./resolve-metadata");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function MetadataTree({ tree , pathname , searchParams , getDynamicParamFromSegment  }) {
    const options = {
        pathname
    };
    const resolvedMetadata = await (0, _resolvemetadata.resolveMetadata)({
        tree,
        parentParams: {},
        metadataItems: [],
        searchParams,
        getDynamicParamFromSegment
    });
    const metadata = await (0, _resolvemetadata.accumulateMetadata)(resolvedMetadata, options);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_basic.BasicMetadata, {
        metadata: metadata
    }), /*#__PURE__*/ _react.default.createElement(_alternate.AlternatesMetadata, {
        alternates: metadata.alternates
    }), /*#__PURE__*/ _react.default.createElement(_basic.ItunesMeta, {
        itunes: metadata.itunes
    }), /*#__PURE__*/ _react.default.createElement(_basic.FormatDetectionMeta, {
        formatDetection: metadata.formatDetection
    }), /*#__PURE__*/ _react.default.createElement(_basic.VerificationMeta, {
        verification: metadata.verification
    }), /*#__PURE__*/ _react.default.createElement(_basic.AppleWebAppMeta, {
        appleWebApp: metadata.appleWebApp
    }), /*#__PURE__*/ _react.default.createElement(_opengraph.OpenGraphMetadata, {
        openGraph: metadata.openGraph
    }), /*#__PURE__*/ _react.default.createElement(_opengraph.TwitterMetadata, {
        twitter: metadata.twitter
    }), /*#__PURE__*/ _react.default.createElement(_opengraph.AppLinksMeta, {
        appLinks: metadata.appLinks
    }), /*#__PURE__*/ _react.default.createElement(_icons.IconsMetadata, {
        icons: metadata.icons
    }));
}

//# sourceMappingURL=metadata.js.map