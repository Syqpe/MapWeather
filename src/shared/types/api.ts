import { AxiosResponse } from "axios";

interface FailResponse {
    error: {
        code: number;
        message: string;
    };
}

type ResponseInterface<T> = T | FailResponse;

const isSuccessResponse = <T>(
    response: ResponseInterface<T>,
): response is T => {
    return !(response as FailResponse).error;
};

type FetchInterface<T> = AxiosResponse<
    ResponseInterface<T>
>;

export type {
    FetchInterface,
    ResponseInterface,
    FailResponse,
};
export { isSuccessResponse };
