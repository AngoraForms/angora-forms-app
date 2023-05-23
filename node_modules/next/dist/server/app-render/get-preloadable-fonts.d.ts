import { NextFontManifest } from '../../build/webpack/plugins/next-font-manifest-plugin';
import { ClientCSSReferenceManifest } from '../../build/webpack/plugins/flight-manifest-plugin';
/**
 * Get hrefs for fonts to preload
 * Returns null if there are no fonts at all.
 * Returns string[] if there are fonts to preload (font paths)
 * Returns empty string[] if there are fonts but none to preload and no other fonts have been preloaded
 * Returns null if there are fonts but none to preload and at least some were previously preloaded
 */
export declare function getPreloadableFonts(serverCSSManifest: ClientCSSReferenceManifest, nextFontManifest: NextFontManifest | undefined, serverCSSForEntries: string[], filePath: string | undefined, injectedFontPreloadTags: Set<string>): string[] | null;
