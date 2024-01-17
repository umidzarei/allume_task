import { ApiClient, CreateQueryResp, QueryResultResp } from "../../types";
export type MockApiClientInput = {
    createQueryResp: CreateQueryResp;
    getQueryResultResp: QueryResultResp;
};
export declare function getMockApiClient(input: MockApiClientInput): ApiClient;
//# sourceMappingURL=api-mocks.d.ts.map