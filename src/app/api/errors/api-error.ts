interface IAPIError {
    code: string;
    status: number;
    message?: string;
}

class BaseError extends Error {
    public readonly code: string;

    public constructor(code: string, message?: string) {
        super(message);
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class APIError extends BaseError implements IAPIError {
    public readonly status: number;

    public readonly message: string;

    public constructor(error: IAPIError) {
        const { code, status, message } = error;

        super(code, message);

        this.status = status;
        this.message = message || "";
    }
}

export type { IAPIError };
export { APIError, BaseError };
