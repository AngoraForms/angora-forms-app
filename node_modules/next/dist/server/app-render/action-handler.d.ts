/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import RenderResult from '../render-result';
import { StaticGenerationStore } from '../../client/components/static-generation-async-storage';
import { ActionResult } from './types';
export declare function handleAction({ req, res, ComponentMod, pathname, serverActionsManifest, generateFlight, staticGenerationStore, }: {
    req: IncomingMessage;
    res: ServerResponse;
    ComponentMod: any;
    pathname: string;
    serverActionsManifest: any;
    generateFlight: (options: {
        actionResult: ActionResult;
        skipFlight: boolean;
        asNotFound?: boolean;
    }) => Promise<RenderResult>;
    staticGenerationStore: StaticGenerationStore;
}): Promise<undefined | RenderResult | 'not-found'>;
