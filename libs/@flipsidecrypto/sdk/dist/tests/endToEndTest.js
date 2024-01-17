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
const flipside_1 = require("../flipside");
const runIt = () => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize `Flipside` with your API key
    const flipside = new flipside_1.Flipside("api-key-here", "https://api.flipsidecrypto.com");
    // Create a query object for the `query.run` function to execute
    const query = {
        sql: "select nft_address, mint_price_eth, mint_price_usd from flipside_prod_db.ethereum_core.ez_nft_mints limit 100",
        ttlMinutes: 10,
        pageSize: 100,
        pageNumber: 1
    };
    // Send the `Query` to Flipside's query engine and await the results
    const result = yield flipside.query.run(query);
    if (!result || !result.records)
        throw "null result";
    console.log(result);
});
runIt();
//# sourceMappingURL=endToEndTest.js.map