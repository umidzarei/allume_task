import { QueryRunExecutionError, QueryRunRateLimitError, QueryRunTimeoutError, ServerError, UserError, UnexpectedSDKError } from "../../errors";
import { QueryResultSet, Row, QueryResultRecord, QueryRunStats, QueryStatus } from "../../types";
import { QueryResultSetBuilderInput } from "../../types/query-result-set-input.type";
export declare class QueryResultSetBuilder implements QueryResultSet {
    #private;
    queryId: string | null;
    status: QueryStatus | null;
    columns: string[] | null;
    columnTypes: string[] | null;
    rows: Row[] | null;
    runStats: QueryRunStats | null;
    records: QueryResultRecord[] | null;
    error: QueryRunRateLimitError | QueryRunTimeoutError | QueryRunExecutionError | ServerError | UserError | UnexpectedSDKError | null;
    constructor(data: QueryResultSetBuilderInput);
}
//# sourceMappingURL=query-result-set-builder.d.ts.map