interface IAPIError {
    code: number;
    message?: string;
}

class BaseError extends Error {
    public readonly code: number;

    public constructor(code: number, message?: string) {
        super(message);
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class APIError extends BaseError implements IAPIError {
    public readonly code: number;

    public readonly message: string;

    public constructor(error: IAPIError) {
        const { code, message } = error;

        super(code, message);

        this.code = code;
        this.message = message || "";
    }
}

export type { IAPIError };
export { APIError, BaseError };
