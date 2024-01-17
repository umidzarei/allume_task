
const state = {
  //General
  queries: {
    "Success_rate": {
      result: null,
      sql: ` with price as 
        (select avg(PRICE) as price, 
          date_trunc('day',HOUR) as date
        from 
        ethereum.core.fact_hourly_token_prices
        where
        SYMBOL='WETH'
        group by 2)
        , 
           teddy as
        (select date_trunc('day',BLOCK_TIMESTAMP) as datee, * 
        from optimism.core.fact_transactions)
        
        select 
           sum(price*TX_FEE) as fees, 
           count(*) as number ,
           avg(price*TX_FEE) as agfees,
           count(distinct FROM_ADDRESS) as daily_active_user, 
           sum(GAS_USED) as gas , 
           avg(GAS_USED) , avg(gas_price*price) as avggasprice, 
           count(case when STATUS='SUCCESS' then 1 else null end)*100/number as success_rate, 
           date,
           number/daily_active_user as transaction_per_user,
           sum(number) over (order by date) as cumulative_transactions,
           sum(fees) over (order by date) as cumulative_fees,  
           sum(gas) over (order by date) as cumulative_gas_used
           
           from teddy a
        inner join price b   on a.datee=b.DATE
        group by date order by date asc`
    },
    "general_price": {
      result: null,
      sql: `select avg(close) as price , 
      date_trunc('day',RECORDED_HOUR) as date 
      from 
      crosschain.core.fact_hourly_prices
        where 
        ID='optimism'
      group by date order by date asc`
    },
    "stake": {
      result: null,
      sql: `with gorges as 
      (select RAW_NEW_BALANCE/1e18-RAW_PREVIOUS_BALANCE/1e18 as volume , 
      case when volume<0 then 'unstake' else 'stake' end as type, 
      date_trunc('day',BLOCK_TIMESTAMP) as date, 
      DELEGATOR,TO_DELEGATE
      from 
      optimism.core.fact_delegations)
      
      select 
        sum (case when type='stake' then volume else null end) as stake,
        sum (case when type='unstake' then volume*-1 else null end) as unstake,
       
         count (case when type='stake' then 1 else null end) as stake_number,
        count (case when type='unstake' then 1 else null end) as unstake_number, 
        date, 
        sum(stake) over (order by date) as c_stke,
        sum(unstake) over (order by date) as c_unstake,
         c_stke-c_unstake  as net_flow
        from gorges
      group by date order by date asc`
    },
    'nft': {
      result: null,
      sql: `with essay as
      (select min(BLOCK_TIMESTAMP) as date, 
      NFT_ADDRESS
      from 
      optimism.core.ez_nft_sales
      group by 2)
      
      select
        count(*) as number , 
      date_trunc(day,date) as datee, 
       sum(number) over (order by datee) as c_number
      from  essay 
      group by 2 order by datee asc`
    },
    "nft_seals": {
      result: null,
      sql: `select 
      count(*) as number , 
      sum(PRICE_USD) as volume , 
      date_trunc('week',BLOCK_TIMESTAMP ) as DATE, 
      sum(volume) over (order by date) as C_volume
      from 
      optimism.core.ez_nft_sales
      
      group by date
      order by date asc`
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
