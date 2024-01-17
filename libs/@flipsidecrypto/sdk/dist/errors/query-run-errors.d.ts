import { BaseError } from "./base-error";
export declare class QueryRunRateLimitError extends BaseError {
    constructor();
}
export declare class QueryRunTimeoutError extends BaseError {
    constructor(timeoutMinutes: number);
}
export declare class QueryRunExecutionError extends BaseError {
    constructor();
}
//# sourceMappingURL=query-run-errors.d.ts.map