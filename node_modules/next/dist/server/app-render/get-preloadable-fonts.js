"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPreloadableFonts", {
    enumerable: true,
    get: function() {
        return getPreloadableFonts;
    }
});
function getPreloadableFonts(serverCSSManifest, nextFontManifest, serverCSSForEntries, filePath, injectedFontPreloadTags) {
    if (!nextFontManifest || !filePath) {
        return null;
    }
    const layoutOrPageCss = serverCSSManifest.cssImports[filePath];
    if (!layoutOrPageCss) {
        return null;
    }
    const fontFiles = new Set();
    let foundFontUsage = false;
    for (const css of layoutOrPageCss){
        // We only include the CSS if it is used by this entrypoint.
        if (serverCSSForEntries.includes(css)) {
            const preloadedFontFiles = nextFontManifest.app[css];
            if (preloadedFontFiles) {
                foundFontUsage = true;
                for (const fontFile of preloadedFontFiles){
                    if (!injectedFontPreloadTags.has(fontFile)) {
                        fontFiles.add(fontFile);
                        injectedFontPreloadTags.add(fontFile);
                    }
                }
            }
        }
    }
    if (fontFiles.size) {
        return [
            ...fontFiles
        ].sort();
    } else if (foundFontUsage && injectedFontPreloadTags.size === 0) {
        return [];
    } else {
        return null;
    }
}

//# sourceMappingURL=get-preloadable-fonts.js.map