import type webpack from 'webpack';
import type { CollectingMetadata } from './types';
export declare const METADATA_RESOURCE_QUERY = "?__next_metadata";
export declare function createStaticMetadataFromRoute(resolvedDir: string, { segment, resolvePath, isRootLayoutOrRootPage, loaderContext, pageExtensions, basePath, }: {
    segment: string;
    resolvePath: (pathname: string) => Promise<string>;
    isRootLayoutOrRootPage: boolean;
    loaderContext: webpack.LoaderContext<any>;
    pageExtensions: string[];
    basePath: string;
}): Promise<CollectingMetadata | null>;
export declare function createMetadataExportsCode(metadata: Awaited<ReturnType<typeof createStaticMetadataFromRoute>>): string;
