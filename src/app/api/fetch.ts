import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

import { FetchInterface, ResponseInterface } from "@localtypes/*";
import { APIError } from "./errors";
import { API } from "./configs/axios-config";

const DEFAULT_HEADERS: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

async function handleErrorResponse<T>(response: FetchInterface<T>) {
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

async function fetch<T>(path: string, options: AxiosRequestConfig = {}): Promise<ResponseInterface<T>> {
    const { method = "GET", headers = {}, ...restOptions } = options;

    if (method !== "GET") {
        headers["x-csrf-token"] = "ops_csrf";
    }

    const response: FetchInterface<T> = await API(path, {
        headers: {
            ...DEFAULT_HEADERS,
            ...headers,
        } as RawAxiosRequestHeaders,
        method,
        ...restOptions,
    });

    if (!response.data) {
        await handleErrorResponse<T>(response);
    }

    return response.data;
}

export { fetch };
