import { AxiosResponse } from "axios";

enum ResponseStatuses {
    "success" = "success",
    "error" = "error",
    "loading" = "loading",
}

interface FailResponse {
    status: ResponseStatuses.error;
    message: string;
}

interface SuccessResponse<T> {
    status: ResponseStatuses.success;
    message: T;
}

type ResponseInterface<T> = SuccessResponse<T> | FailResponse;

const isSuccessResponse = <T>(response: ResponseInterface<T>): response is SuccessResponse<T> => {
    return !!(response as SuccessResponse<T>).message;
};

type FetchInterface<T> = AxiosResponse<ResponseInterface<T>>;

export type { FetchInterface, ResponseInterface, SuccessResponse, FailResponse };
export { isSuccessResponse, ResponseStatuses };
