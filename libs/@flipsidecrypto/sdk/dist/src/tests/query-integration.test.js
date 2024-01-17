"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const __1 = require("..");
const query_integration_1 = require("../integrations/query-integration");
const types_1 = require("../types");
const api_mocks_1 = require("./mocks/api-mocks");
let createQueryData = {
    token: "flipside test token",
    errors: null,
};
let defaultQueryData = {
    sql: "select 1",
    ttlMinutes: 1,
};
let createQueries = {
    userError: {
        data: createQueryData,
        statusCode: 400,
        statusMsg: null,
        errorMsg: null,
    },
    serverError: {
        data: createQueryData,
        statusCode: 500,
        statusMsg: null,
        errorMsg: null,
    },
    rateLimitError: {
        data: createQueryData,
        statusCode: 429,
        statusMsg: null,
        errorMsg: null,
    },
    noError: {
        data: createQueryData,
        statusCode: 200,
        statusMsg: null,
        errorMsg: null,
    },
};
function generateQueryResultData(status) {
    return {
        queryId: "test",
        status,
        results: [],
        startedAt: "2022-05-19T00:00:00Z",
        endedAt: "2022-05-19T00:00:00Z",
        columnLabels: ["block_id", "tx_id"],
        columnTypes: ["string", "string"],
        message: "",
        errors: "invalid sql",
        pageNumber: 1,
        pageSize: 100,
    };
}
let getQueryResult = {
    userError: {
        data: generateQueryResultData(types_1.QueryStatusError),
        statusCode: 400,
        statusMsg: null,
        errorMsg: null,
    },
    serverError: {
        data: generateQueryResultData(types_1.QueryStatusPending),
        statusCode: 500,
        statusMsg: null,
        errorMsg: null,
    },
    noErrorPending: {
        data: generateQueryResultData(types_1.QueryStatusPending),
        statusCode: 200,
        statusMsg: null,
        errorMsg: null,
    },
    noErrorFinished: {
        data: generateQueryResultData(types_1.QueryStatusFinished),
        statusCode: 200,
        statusMsg: null,
        errorMsg: null,
    },
    sqlExecError: {
        data: generateQueryResultData(types_1.QueryStatusError),
        statusCode: 200,
        statusMsg: null,
        errorMsg: null,
    },
};
(0, vitest_1.describe)("run: server_error", () => {
    (0, vitest_1.it)("#createQuery server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const api = (0, api_mocks_1.getMockApiClient)({
            createQueryResp: createQueries.serverError,
            getQueryResultResp: getQueryResult.noErrorPending,
        });
        const queryIntegration = new query_integration_1.QueryIntegration(api);
        const result = yield queryIntegration.run(defaultQueryData);
        vitest_1.assert.equal((_a = result.error) === null || _a === void 0 ? void 0 : _a.errorType, __1.ERROR_TYPES.server_error);
        vitest_1.assert.notEqual((_b = result.error) === null || _b === void 0 ? void 0 : _b.message, null);
    }));
    (0, vitest_1.it)("#getQueryResult server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        const api = (0, api_mocks_1.getMockApiClient)({
            createQueryResp: createQueries.noError,
            getQueryResultResp: getQueryResult.serverError,
        });
        const queryIntegration = new query_integration_1.QueryIntegration(api);
        const result = yield queryIntegration.run(defaultQueryData);
        vitest_1.assert.equal((_c = result.error) === null || _c === void 0 ? void 0 : _c.errorType, __1.ERROR_TYPES.server_error);
        vitest_1.assert.notEqual((_d = result.error) === null || _d === void 0 ? void 0 : _d.message, null);
    }));
});
(0, vitest_1.describe)("run: user_error", () => {
    (0, vitest_1.it)("#createQuery user error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const api = (0, api_mocks_1.getMockApiClient)({
            createQueryResp: createQueries.userError,
            getQueryResultResp: getQueryResult.noErrorPending,
        });
        const queryIntegration = new query_integration_1.QueryIntegration(api);
        const result = yield queryIntegration.run(defaultQueryData);
        vitest_1.assert.equal((_a = result.error) === null || _a === void 0 ? void 0 : _a.errorType, __1.ERROR_TYPES.user_error);
        vitest_1.assert.notEqual((_b = result.error) === null || _b === void 0 ? void 0 : _b.message, null);
    }));
    (0, vitest_1.it)("#getQueryResult user error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        const api = (0, api_mocks_1.getMockApiClient)({
            createQueryResp: createQueries.noError,
            getQueryResultResp: getQueryResult.userError,
        });
        const queryIntegration = new query_integration_1.QueryIntegration(api);
        const result = yield queryIntegration.run(defaultQueryData);
        vitest_1.assert.equal((_c = result.error) === null || _c === void 0 ? void 0 : _c.errorType, __1.ERROR_TYPES.user_error);
        vitest_1.assert.notEqual((_d = result.error) === null || _d === void 0 ? void 0 : _d.message, null);
    }));
    (0, vitest_1.it)("#getQueryResult sql exec error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        const api = (0, api_mocks_1.getMockApiClient)({
            createQueryResp: createQueries.noError,
            getQueryResultResp: getQueryResult.sqlExecError,
        });
        const queryIntegration = new query_integration_1.QueryIntegration(api);
        const result = yield queryIntegration.run(defaultQueryData);
        vitest_1.assert.equal((_e = result.error) === null || _e === void 0 ? void 0 : _e.errorType, __1.ERROR_TYPES.query_run_execution_error);
        vitest_1.assert.notEqual((_f = result.error) === null || _f === void 0 ? void 0 : _f.message, null);
    }));
});
(0, vitest_1.describe)("run: timeout_error", () => {
    (0, vitest_1.it)("query is pending", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const api = (0, api_mocks_1.getMockApiClient)({
            createQueryResp: createQueries.noError,
            getQueryResultResp: getQueryResult.noErrorPending,
        });
        const queryIntegration = new query_integration_1.QueryIntegration(api, {
            ttlMinutes: 1,
            cached: false,
            timeoutMinutes: 0.01,
            retryIntervalSeconds: 0.001,
            pageNumber: 1,
            pageSize: 100,
        });
        const result = yield queryIntegration.run(defaultQueryData);
        vitest_1.assert.equal((_a = result.error) === null || _a === void 0 ? void 0 : _a.errorType, __1.ERROR_TYPES.query_run_timeout_error);
        vitest_1.assert.notEqual((_b = result.error) === null || _b === void 0 ? void 0 : _b.message, null);
    }));
    (0, vitest_1.it)("query is rate limited", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        const api = (0, api_mocks_1.getMockApiClient)({
            createQueryResp: createQueries.rateLimitError,
            getQueryResultResp: getQueryResult.noErrorPending,
        });
        const queryIntegration = new query_integration_1.QueryIntegration(api, {
            ttlMinutes: 1,
            cached: false,
            timeoutMinutes: 0.01,
            retryIntervalSeconds: 0.001,
            pageNumber: 1,
            pageSize: 100,
        });
        const result = yield queryIntegration.run(defaultQueryData);
        vitest_1.assert.equal((_c = result.error) === null || _c === void 0 ? void 0 : _c.errorType, __1.ERROR_TYPES.query_run_rate_limit_error);
        vitest_1.assert.notEqual((_d = result.error) === null || _d === void 0 ? void 0 : _d.message, null);
    }));
});
//# sourceMappingURL=query-integration.test.js.map