import React from "react";
import { AppleWebAppMeta, FormatDetectionMeta, ItunesMeta, BasicMetadata, VerificationMeta } from "./generate/basic";
import { AlternatesMetadata } from "./generate/alternate";
import { OpenGraphMetadata, TwitterMetadata, AppLinksMeta } from "./generate/opengraph";
import { IconsMetadata } from "./generate/icons";
import { accumulateMetadata, resolveMetadata } from "./resolve-metadata";
// Generate the actual React elements from the resolved metadata.
export async function MetadataTree({ tree , pathname , searchParams , getDynamicParamFromSegment  }) {
    const options = {
        pathname
    };
    const resolvedMetadata = await resolveMetadata({
        tree,
        parentParams: {},
        metadataItems: [],
        searchParams,
        getDynamicParamFromSegment
    });
    const metadata = await accumulateMetadata(resolvedMetadata, options);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(BasicMetadata, {
        metadata: metadata
    }), /*#__PURE__*/ React.createElement(AlternatesMetadata, {
        alternates: metadata.alternates
    }), /*#__PURE__*/ React.createElement(ItunesMeta, {
        itunes: metadata.itunes
    }), /*#__PURE__*/ React.createElement(FormatDetectionMeta, {
        formatDetection: metadata.formatDetection
    }), /*#__PURE__*/ React.createElement(VerificationMeta, {
        verification: metadata.verification
    }), /*#__PURE__*/ React.createElement(AppleWebAppMeta, {
        appleWebApp: metadata.appleWebApp
    }), /*#__PURE__*/ React.createElement(OpenGraphMetadata, {
        openGraph: metadata.openGraph
    }), /*#__PURE__*/ React.createElement(TwitterMetadata, {
        twitter: metadata.twitter
    }), /*#__PURE__*/ React.createElement(AppLinksMeta, {
        appLinks: metadata.appLinks
    }), /*#__PURE__*/ React.createElement(IconsMetadata, {
        icons: metadata.icons
    }));
}

//# sourceMappingURL=metadata.js.map