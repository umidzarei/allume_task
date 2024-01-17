"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _QueryResultSetBuilder_instances, _QueryResultSetBuilder_computeRunStats, _QueryResultSetBuilder_createRecords;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResultSetBuilder = void 0;
class QueryResultSetBuilder {
    constructor(data) {
        _QueryResultSetBuilder_instances.add(this);
        this.error = data.error;
        const queryResultJson = data.queryResultJson;
        if (!queryResultJson) {
            this.queryId = null;
            this.status = null;
            this.columns = null;
            this.columnTypes = null;
            this.rows = null;
            this.runStats = null;
            this.records = null;
            return;
        }
        this.queryId = queryResultJson.queryId;
        this.status = queryResultJson.status;
        this.columns = queryResultJson.columnLabels;
        this.columnTypes = queryResultJson.columnTypes;
        this.rows = queryResultJson.results;
        this.runStats = __classPrivateFieldGet(this, _QueryResultSetBuilder_instances, "m", _QueryResultSetBuilder_computeRunStats).call(this, queryResultJson);
        this.records = __classPrivateFieldGet(this, _QueryResultSetBuilder_instances, "m", _QueryResultSetBuilder_createRecords).call(this, queryResultJson);
    }
}
exports.QueryResultSetBuilder = QueryResultSetBuilder;
_QueryResultSetBuilder_instances = new WeakSet(), _QueryResultSetBuilder_computeRunStats = function _QueryResultSetBuilder_computeRunStats(queryResultJson) {
    if (!queryResultJson) {
        return null;
    }
    let startedAt = new Date(queryResultJson.startedAt);
    let endedAt = new Date(queryResultJson.endedAt);
    let elapsedSeconds = (endedAt.getTime() - startedAt.getTime()) / 1000;
    return {
        startedAt,
        endedAt,
        elapsedSeconds,
        recordCount: queryResultJson.results.length,
    };
}, _QueryResultSetBuilder_createRecords = function _QueryResultSetBuilder_createRecords(queryResultJson) {
    if (!queryResultJson) {
        return null;
    }
    let columnLabels = queryResultJson.columnLabels;
    if (!columnLabels) {
        return null;
    }
    return queryResultJson.results.map((result) => {
        let record = {};
        result.forEach((value, index) => {
            record[columnLabels[index].toLowerCase()] = value;
        });
        return record;
    });
};
//# sourceMappingURL=query-result-set-builder.js.map