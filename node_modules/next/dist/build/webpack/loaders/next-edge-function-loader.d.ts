import type webpack from 'webpack';
export declare type EdgeFunctionLoaderOptions = {
    absolutePagePath: string;
    page: string;
    rootDir: string;
    preferredRegion: string | string[] | undefined;
};
declare const nextEdgeFunctionLoader: webpack.LoaderDefinitionFunction<EdgeFunctionLoaderOptions>;
export default nextEdgeFunctionLoader;
