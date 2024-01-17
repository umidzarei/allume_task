import { Query, QueryDefaults, ApiClient, QueryResultSet } from "../../types";
export declare class QueryIntegration {
    #private;
    constructor(api: ApiClient, defaults?: QueryDefaults);
    run(query: Query): Promise<QueryResultSet>;
}
//# sourceMappingURL=index.d.ts.map