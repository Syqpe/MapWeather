import {
    AxiosRequestConfig,
    RawAxiosRequestHeaders,
} from "axios";
import { QueryMeta } from "react-query";

import {
    FailResponse,
    FetchInterface,
    ResponseInterface,
    isSuccessResponse,
} from "@localtypes/index";
import { APIError } from "./errors";
import {
    WEATHERAPI,
    GOOGLEAPI,
} from "./configs/axios-config";

const DEFAULT_HEADERS: HeadersInit_ = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

async function handleErrorResponse(response: FailResponse) {
    const { error } = response;

    let code = error.code || 500;
    let message = error.message || "Something error!!!";

    throw new APIError({ code, message });
}

type MetaType = QueryMeta & {
    type?: "weatherapi" | "googleapi";
};

function getRequestAPI(meta: MetaType) {
    switch (meta.type) {
        case "googleapi":
            return GOOGLEAPI;
        case "weatherapi":
        default:
            return WEATHERAPI;
    }
}

async function fetch<T>(
    path: string,
    options: AxiosRequestConfig = {},
    meta?: MetaType,
): Promise<ResponseInterface<T>> {
    const {
        method = "GET",
        headers = {},
        params = {},
        ...restOptions
    } = options;

    if (method !== "GET") {
        headers["x-csrf-token"] = "ops_csrf";
    }

    let localParams = params;

    // If path include ?something=...&...
    const paramsStartIndex = path.indexOf("?");
    if (paramsStartIndex > 0) {
        localParams = {
            ...path
                .slice(paramsStartIndex + 1)
                .split("&")
                .reduce((paramsObj, str) => {
                    const [key = "", value] =
                        str.split("=");

                    paramsObj[key] = value;

                    return paramsObj;
                }, {} as Record<string, string>),
            ...localParams,
        };

        path = path.slice(0, paramsStartIndex + 1);
    }

    const RequestAPI = getRequestAPI(meta || {});

    const response: FetchInterface<T> = await RequestAPI(
        path,
        {
            method,
            params: localParams,
            headers: {
                ...DEFAULT_HEADERS,
                ...headers,
            } as RawAxiosRequestHeaders,
            ...restOptions,
        },
    );

    if (!isSuccessResponse(response.data)) {
        await handleErrorResponse(response.data);
    }

    return response.data;
}

export { fetch };
