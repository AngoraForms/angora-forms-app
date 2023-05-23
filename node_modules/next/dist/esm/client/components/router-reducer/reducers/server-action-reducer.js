import { callServer } from "../../../app-call-server";
import { NEXT_ROUTER_STATE_TREE, NEXT_URL, RSC_CONTENT_TYPE_HEADER } from "../../app-router-headers";
import { createRecordFromThenable } from "../create-record-from-thenable";
import { readRecordValue } from "../read-record-value";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createFromFetch } from "react-server-dom-webpack/client";
// eslint-disable-next-line import/no-extraneous-dependencies
import { encodeReply } from "react-server-dom-webpack/client";
import { PrefetchKind } from "../router-reducer-types";
import { addBasePath } from "../../../add-base-path";
import { createHrefFromUrl } from "../create-href-from-url";
import { RedirectType, getRedirectError } from "../../redirect";
async function fetchServerAction(state, param) {
    let { actionId , actionArgs  } = param;
    const body = await encodeReply(actionArgs);
    const res = await fetch("", {
        method: "POST",
        headers: {
            Accept: RSC_CONTENT_TYPE_HEADER,
            "Next-Action": actionId,
            [NEXT_ROUTER_STATE_TREE]: JSON.stringify(state.tree),
            ...state.nextUrl ? {
                [NEXT_URL]: state.nextUrl
            } : {}
        },
        body
    });
    const location = res.headers.get("x-action-redirect");
    const redirectLocation = location ? new URL(addBasePath(location), window.location.origin) : undefined;
    let isFlightResponse = res.headers.get("content-type") === RSC_CONTENT_TYPE_HEADER;
    if (isFlightResponse) {
        const result = await createFromFetch(Promise.resolve(res), {
            callServer
        });
        // if it was a redirection, then result is just a regular RSC payload
        if (location) {
            return {
                actionFlightData: result,
                redirectLocation
            };
        // otherwise it's a tuple of [actionResult, actionFlightData]
        } else {
            const [actionResult, actionFlightData] = result != null ? result : [];
            return {
                actionResult,
                actionFlightData,
                redirectLocation
            };
        }
    }
    return {
        redirectLocation
    };
}
/*
 * This reducer is responsible for calling the server action and processing any side-effects from the server action.
 * It does not mutate the state by itself but rather delegates to other reducers to do the actual mutation.
 */ export function serverActionReducer(state, action) {
    // the action could be called twice so we need to check if we already have applied it
    if (action.mutable.serverActionApplied) {
        return state;
    }
    if (!action.mutable.inFlightServerAction) {
        action.mutable.previousTree = state.tree;
        action.mutable.previousUrl = state.canonicalUrl;
        action.mutable.inFlightServerAction = createRecordFromThenable(fetchServerAction(state, action));
    }
    try {
        // suspends until the server action is resolved.
        const { actionResult , actionFlightData , redirectLocation  } = readRecordValue(action.mutable.inFlightServerAction);
        if (redirectLocation) {
            // the redirection might have a flight data associated with it, so we'll populate the cache with it
            if (actionFlightData) {
                const href = createHrefFromUrl(redirectLocation, false);
                const previousCacheEntry = state.prefetchCache.get(href);
                var _previousCacheEntry_kind;
                state.prefetchCache.set(href, {
                    data: createRecordFromThenable(Promise.resolve([
                        actionFlightData,
                        // TODO-APP: verify the logic around canonical URL overrides
                        undefined
                    ])),
                    kind: (_previousCacheEntry_kind = previousCacheEntry == null ? void 0 : previousCacheEntry.kind) != null ? _previousCacheEntry_kind : PrefetchKind.TEMPORARY,
                    prefetchTime: Date.now(),
                    treeAtTimeOfPrefetch: action.mutable.previousTree,
                    lastUsedTime: null
                });
            }
            // we throw the redirection in the action handler so that it is caught during render
            action.reject(getRedirectError(redirectLocation.toString(), RedirectType.push));
        } else {
            if (actionFlightData) {
                const href = createHrefFromUrl(new URL(action.mutable.previousUrl, window.location.origin), false);
                const previousCacheEntry = state.prefetchCache.get(href);
                var _previousCacheEntry_kind1;
                state.prefetchCache.set(createHrefFromUrl(new URL(action.mutable.previousUrl, window.location.origin), false), {
                    data: createRecordFromThenable(Promise.resolve([
                        actionFlightData,
                        // TODO-APP: verify the logic around canonical URL overrides
                        undefined
                    ])),
                    kind: (_previousCacheEntry_kind1 = previousCacheEntry == null ? void 0 : previousCacheEntry.kind) != null ? _previousCacheEntry_kind1 : PrefetchKind.TEMPORARY,
                    prefetchTime: Date.now(),
                    treeAtTimeOfPrefetch: action.mutable.previousTree,
                    lastUsedTime: null
                });
                // this is an intentional hack around React: we want to update the tree in a new render
                setTimeout(()=>{
                    action.changeByServerResponse(action.mutable.previousTree, actionFlightData, // TODO-APP: verify the logic around canonical URL overrides
                    undefined);
                });
            }
            action.resolve(actionResult);
        }
    } catch (e) {
        if (e.status === "rejected") {
            action.reject(e.value);
        } else {
            throw e;
        }
    }
    action.mutable.serverActionApplied = true;
    return state;
}

//# sourceMappingURL=server-action-reducer.js.map