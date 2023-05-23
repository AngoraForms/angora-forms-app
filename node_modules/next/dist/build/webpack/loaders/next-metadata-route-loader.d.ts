import type webpack from 'webpack';
declare type MetadataRouteLoaderOptions = {
    page: string;
    pageExtensions: string[];
};
declare const nextMetadataRouterLoader: webpack.LoaderDefinitionFunction<MetadataRouteLoaderOptions>;
export default nextMetadataRouterLoader;
