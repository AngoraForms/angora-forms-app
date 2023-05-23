/// <reference types="node" />
import type { RequestCookies } from '../cookies';
import type { BaseNextResponse } from '../../../base-http';
import type { ServerResponse } from 'http';
import { ResponseCookies } from '../cookies';
export declare type ReadonlyRequestCookies = Omit<RequestCookies, 'clear' | 'delete'>;
export declare class RequestCookiesAdapter {
    static seal(cookies: RequestCookies): ReadonlyRequestCookies;
}
export declare function appendMutableCookies(headers: Headers, mutableCookies: ResponseCookies): boolean;
export declare class MutableRequestCookiesAdapter {
    static wrap(cookies: RequestCookies, res: ServerResponse | BaseNextResponse | undefined): ResponseCookies;
}
