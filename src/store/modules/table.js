
const state = {
    queries: {
       'Near-Top-Fee-Spenders' : {
        result : null,
        sql : `with near_prices as (
          select date_trunc(hour,TIMESTAMP) as RECORDED_HOUR, SYMBOL, TOKEN_CONTRACT, avg(PRICE_USD) as PRICE_USD
            from near.core.fact_prices
            group by 1,2,3
        ),
        
        near_fees as (
            select TX_HASH, TRANSACTION_FEE/1e24 as TX_FEE, TX_FEE*PRICE_USD as FEE_USD, PRICE_USD as PRICE
            from near.core.fact_transactions a 
            join near_prices b
            on date_trunc(hour, a.BLOCK_TIMESTAMP)=date_trunc(hour, b.RECORDED_HOUR) and SYMBOL='wNEAR'
            where a.BLOCK_TIMESTAMP>=CURRENT_DATE-1000
        ),
        
        near_transfers as (
            select a.*, TX_FEE as FEE, FEE_USD
            from (
            select BLOCK_TIMESTAMP, TX_HASH, TRADER as user, AMOUNT_IN as usd_amount
            from near.core.ez_dex_swaps
            where token_in ilike '%usd%' or token_in ilike 'dai'
            union 
            select BLOCK_TIMESTAMP, TX_HASH, TRADER as user, AMOUNT_IN as usd_amount
            from near.core.ez_dex_swaps
            where token_out ilike '%usd%' or token_out ilike 'dai'
            union 
            select BLOCK_TIMESTAMP, TX_HASH, TRADER as user, AMOUNT_IN*PRICE_USD as usd_amount
            from near.core.ez_dex_swaps a 
            join near_prices b
            on date_trunc(hour, a.BLOCK_TIMESTAMP)=date_trunc(hour, b.RECORDED_HOUR) and SYMBOL='wNEAR'
            where token_in='wNEAR'
            union 
            select BLOCK_TIMESTAMP, TX_HASH, TRADER as user, AMOUNT_IN*PRICE_USD as usd_amount
            from near.core.ez_dex_swaps a 
            join near_prices b
            on date_trunc(hour, a.BLOCK_TIMESTAMP)=date_trunc(hour, b.RECORDED_HOUR) and SYMBOL='wNEAR'
            where token_out='wNEAR'
            union
            select BLOCK_TIMESTAMP, TX_HASH, TX_SIGNER as user, (DEPOSIT/1e24)*PRICE_USD  as usd_amount
            from near.core.fact_transfers a 
            join near_prices b
            on date_trunc(hour, a.BLOCK_TIMESTAMP)=date_trunc(hour, b.RECORDED_HOUR) and SYMBOL='wNEAR'
            where STATUS=TRUE) a 
            join near_fees b 
            on a.TX_HASH=b.TX_HASH), 
        
        near_txs as (
            select BLOCK_ID, BLOCK_TIMESTAMP, a.TX_HASH, TX_SIGNER as user, TX_FEE as FEE, FEE_USD, PRICE, TX_STATUS
            from near.core.fact_transactions a 
            join near_fees b 
            on a.TX_HASH=b.TX_HASH)
          
          
          select user, sum(fee) as total_fee, sum(ifnull(FEE_USD,0)) as total_FEE_USD, avg(FEE_USD) as avg_FEE_USD,
          row_number() over (order by total_FEE_USD desc) as rank
          from near_txs
          group by 1  
          order by total_FEE_USD desc 
          limit 20`
       }
    },

};

const getters = {
    getQueries(state) {
        return state.queries;
    },
};

const mutations = {
    setQueryResult(state, data) { // data => query, result
        state.queries[data.query].result = data.result;
    },
};



export default {
    namespaced: true,
    state,
    getters,
    mutations,
};
