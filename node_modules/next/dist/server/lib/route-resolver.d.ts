import type { IncomingMessage, ServerResponse } from 'http';
import { StackFrame } from 'next/dist/compiled/stacktrace-parser';
import type { NextConfig } from '../config';
export declare type MiddlewareConfig = {
    matcher: string[];
    files: string[];
};
export declare type ServerAddress = {
    hostname: string;
    port: number;
};
export declare type RouteResult = {
    type: 'rewrite';
    url: string;
    statusCode: number;
    headers: Record<string, undefined | number | string | string[]>;
} | {
    type: 'error';
    error: {
        name: string;
        message: string;
        stack: StackFrame[];
    };
} | {
    type: 'none';
};
export declare function makeResolver(dir: string, nextConfig: NextConfig, middleware: MiddlewareConfig, serverAddr: Partial<ServerAddress>): Promise<(_req: IncomingMessage, _res: ServerResponse) => Promise<void>>;
