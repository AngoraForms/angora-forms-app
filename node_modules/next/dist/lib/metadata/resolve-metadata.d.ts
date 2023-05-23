import type { Metadata, ResolvedMetadata, ResolvingMetadata } from './types/metadata-interface';
import type { GetDynamicParamFromSegment } from '../../server/app-render/app-render';
import { LoaderTree } from '../../server/lib/app-dir-module';
import { ComponentsType } from '../../build/webpack/loaders/next-app-loader';
declare type StaticMetadata = Awaited<ReturnType<typeof resolveStaticMetadata>>;
declare type MetadataResolver = (_parent: ResolvingMetadata) => Metadata | Promise<Metadata>;
export declare type MetadataItems = [
    Metadata | MetadataResolver | null,
    StaticMetadata
][];
declare function resolveStaticMetadata(components: ComponentsType, props: any): Promise<{
    icon: any[] | undefined;
    apple: any[] | undefined;
    openGraph: any[] | undefined;
    twitter: any[] | undefined;
    manifest: string | undefined;
} | null>;
export declare function collectMetadata({ tree, metadataItems: array, props, route, }: {
    tree: LoaderTree;
    metadataItems: MetadataItems;
    props: any;
    route: string;
}): Promise<void>;
export declare function resolveMetadata({ tree, parentParams, metadataItems, treePrefix, getDynamicParamFromSegment, searchParams, }: {
    tree: LoaderTree;
    parentParams: {
        [key: string]: any;
    };
    metadataItems: MetadataItems;
    /** Provided tree can be nested subtree, this argument says what is the path of such subtree */
    treePrefix?: string[];
    getDynamicParamFromSegment: GetDynamicParamFromSegment;
    searchParams: {
        [key: string]: any;
    };
}): Promise<MetadataItems>;
declare type MetadataAccumulationOptions = {
    pathname: string;
};
export declare function accumulateMetadata(metadataItems: MetadataItems, options: MetadataAccumulationOptions): Promise<ResolvedMetadata>;
export {};
