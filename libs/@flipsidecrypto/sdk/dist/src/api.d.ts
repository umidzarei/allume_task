import { Query, CreateQueryResp, QueryResultResp, ApiClient } from "./types";
export declare class API implements ApiClient {
    #private;
    constructor(baseUrl: string, sdkPackage: string, sdkVersion: string, apiKey: string);
    getUrl(path: string): string;
    createQuery(query: Query): Promise<CreateQueryResp>;
    getQueryResult(queryID: string, pageNumber: number, pageSize: number): Promise<QueryResultResp>;
}
//# sourceMappingURL=api.d.ts.map