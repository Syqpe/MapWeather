import {
    AxiosRequestConfig,
    RawAxiosRequestHeaders,
} from "axios";
import { QueryMeta } from "react-query";

import {
    FetchInterface,
    ResponseInterface,
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

async function handleErrorResponse<T>(
    response: FetchInterface<T>,
) {
    const { status } = response;

    let data;
    let code;
    let message;

    try {
        data = await response.data;
    } finally {
        code = (data && data.status) || "500_ISE";
        message = data && "Something error!!!";
    }

    throw new APIError({ code, status, message });
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
    meta: MetaType,
): Promise<ResponseInterface<T>> {
    const {
        method = "GET",
        headers = {},
        ...restOptions
    } = options;

    if (method !== "GET") {
        headers["x-csrf-token"] = "ops_csrf";
    }

    const paramsStartIndex = path.indexOf("?");

    const params = path
        .slice(paramsStartIndex + 1)
        .split("&")
        .reduce((paramsObj, str) => {
            const [key = "", value] = str.split("=");

            paramsObj[key] = value;

            return paramsObj;
        }, {} as Record<string, string>);

    path = path.slice(0, paramsStartIndex);

    const RequestAPI = getRequestAPI(meta);

    const response: FetchInterface<T> = await RequestAPI(
        path,
        {
            headers: {
                ...DEFAULT_HEADERS,
                ...headers,
            } as RawAxiosRequestHeaders,
            method,
            params,
            ...restOptions,
        },
    );

    if (!response.data) {
        await handleErrorResponse<T>(response);
    }

    return response.data;
}

export { fetch };
