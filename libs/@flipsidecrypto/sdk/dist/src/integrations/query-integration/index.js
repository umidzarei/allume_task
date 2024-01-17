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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _QueryIntegration_instances, _QueryIntegration_api, _QueryIntegration_defaults, _QueryIntegration_setQueryDefaults, _QueryIntegration_createQuery, _QueryIntegration_getQueryResult;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryIntegration = void 0;
const types_1 = require("../../types");
const sleep_1 = require("../../utils/sleep");
const errors_1 = require("../../errors");
const query_result_set_builder_1 = require("./query-result-set-builder");
const DEFAULTS = {
    ttlMinutes: 60,
    cached: true,
    timeoutMinutes: 20,
    retryIntervalSeconds: 0.5,
    pageSize: 100000,
    pageNumber: 1,
};
class QueryIntegration {
    constructor(api, defaults = DEFAULTS) {
        _QueryIntegration_instances.add(this);
        _QueryIntegration_api.set(this, void 0);
        _QueryIntegration_defaults.set(this, void 0);
        __classPrivateFieldSet(this, _QueryIntegration_api, api, "f");
        __classPrivateFieldSet(this, _QueryIntegration_defaults, defaults, "f");
    }
    run(query) {
        return __awaiter(this, void 0, void 0, function* () {
            query = __classPrivateFieldGet(this, _QueryIntegration_instances, "m", _QueryIntegration_setQueryDefaults).call(this, query);
            const [createQueryJson, createQueryErr] = yield __classPrivateFieldGet(this, _QueryIntegration_instances, "m", _QueryIntegration_createQuery).call(this, query);
            if (createQueryErr) {
                return new query_result_set_builder_1.QueryResultSetBuilder({
                    queryResultJson: null,
                    error: createQueryErr,
                });
            }
            if (!createQueryJson) {
                return new query_result_set_builder_1.QueryResultSetBuilder({
                    queryResultJson: null,
                    error: new errors_1.UnexpectedSDKError("expected a `createQueryJson` but got null"),
                });
            }
            const [getQueryResultJson, getQueryErr] = yield __classPrivateFieldGet(this, _QueryIntegration_instances, "m", _QueryIntegration_getQueryResult).call(this, createQueryJson.token, query.pageNumber || 1, query.pageSize || 100000);
            if (getQueryErr) {
                return new query_result_set_builder_1.QueryResultSetBuilder({
                    queryResultJson: null,
                    error: getQueryErr,
                });
            }
            if (!getQueryResultJson) {
                return new query_result_set_builder_1.QueryResultSetBuilder({
                    queryResultJson: null,
                    error: new errors_1.UnexpectedSDKError("expected a `getQueryResultJson` but got null"),
                });
            }
            return new query_result_set_builder_1.QueryResultSetBuilder({
                queryResultJson: getQueryResultJson,
                error: null,
            });
        });
    }
}
exports.QueryIntegration = QueryIntegration;
_QueryIntegration_api = new WeakMap(), _QueryIntegration_defaults = new WeakMap(), _QueryIntegration_instances = new WeakSet(), _QueryIntegration_setQueryDefaults = function _QueryIntegration_setQueryDefaults(query) {
    return Object.assign(Object.assign({}, __classPrivateFieldGet(this, _QueryIntegration_defaults, "f")), query);
}, _QueryIntegration_createQuery = function _QueryIntegration_createQuery(query, attempts = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield __classPrivateFieldGet(this, _QueryIntegration_api, "f").createQuery(query);
        if (resp.statusCode <= 299) {
            return [resp.data, null];
        }
        if (resp.statusCode !== 429) {
            if (resp.statusCode >= 400 && resp.statusCode <= 499) {
                let errorMsg = resp.statusMsg || "user error";
                if (resp.errorMsg) {
                    errorMsg = resp.errorMsg;
                }
                return [null, new errors_1.UserError(resp.statusCode, errorMsg)];
            }
            return [
                null,
                new errors_1.ServerError(resp.statusCode, resp.statusMsg || "server error"),
            ];
        }
        let shouldContinue = yield (0, sleep_1.expBackOff)({
            attempts,
            timeoutMinutes: __classPrivateFieldGet(this, _QueryIntegration_defaults, "f").timeoutMinutes,
            intervalSeconds: __classPrivateFieldGet(this, _QueryIntegration_defaults, "f").retryIntervalSeconds,
        });
        if (!shouldContinue) {
            return [null, new errors_1.QueryRunRateLimitError()];
        }
        return __classPrivateFieldGet(this, _QueryIntegration_instances, "m", _QueryIntegration_createQuery).call(this, query, attempts + 1);
    });
}, _QueryIntegration_getQueryResult = function _QueryIntegration_getQueryResult(queryID, pageNumber, pageSize, attempts = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield __classPrivateFieldGet(this, _QueryIntegration_api, "f").getQueryResult(queryID, pageNumber, pageSize);
        if (resp.statusCode > 299) {
            if (resp.statusCode >= 400 && resp.statusCode <= 499) {
                let errorMsg = resp.statusMsg || "user input error";
                if (resp.errorMsg) {
                    errorMsg = resp.errorMsg;
                }
                return [null, new errors_1.UserError(resp.statusCode, errorMsg)];
            }
            return [
                null,
                new errors_1.ServerError(resp.statusCode, resp.statusMsg || "server error"),
            ];
        }
        if (!resp.data) {
            throw new Error("valid status msg returned from server but no data exists in the response");
        }
        if (resp.data.status === types_1.QueryStatusFinished) {
            return [resp.data, null];
        }
        if (resp.data.status === types_1.QueryStatusError) {
            return [null, new errors_1.QueryRunExecutionError()];
        }
        let shouldContinue = yield (0, sleep_1.linearBackOff)({
            attempts,
            timeoutMinutes: __classPrivateFieldGet(this, _QueryIntegration_defaults, "f").timeoutMinutes,
            intervalSeconds: __classPrivateFieldGet(this, _QueryIntegration_defaults, "f").retryIntervalSeconds,
        });
        if (!shouldContinue) {
            const elapsedSeconds = (0, sleep_1.getElapsedLinearSeconds)({
                attempts,
                timeoutMinutes: __classPrivateFieldGet(this, _QueryIntegration_defaults, "f").timeoutMinutes,
                intervalSeconds: __classPrivateFieldGet(this, _QueryIntegration_defaults, "f").retryIntervalSeconds,
            });
            return [null, new errors_1.QueryRunTimeoutError(elapsedSeconds * 60)];
        }
        return __classPrivateFieldGet(this, _QueryIntegration_instances, "m", _QueryIntegration_getQueryResult).call(this, queryID, pageNumber, pageSize, attempts + 1);
    });
};
//# sourceMappingURL=index.js.map