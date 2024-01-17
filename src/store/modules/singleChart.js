
const state = {
  queries: {
    // sigles charst season 0 
    "users": {
      result: null,
      sql: `select 
      count(distinct FROM_ADDRESS) as user_number
      from 
      optimism.core.fact_transactions`
    },
    "stake_unstake": {
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
         stake-unstake  as net_flow,
        count(distinct DELEGATOR) as stakers,
        count(distinct TO_DELEGATE) as staking_pools
        from gorges`
    },
    "nft": {
      result: null,
      sql: `select 
      count(distinct NFT_ADDRESS) as NFt_nmber, 
      count(distinct PLATFORM_EXCHANGE_VERSION) as platform_number
       
      from 
      optimism.core.ez_nft_sales`
    },
    "nft_seals" : {
      result : null,
      sql : `select 
      count(distinct PLATFORM_NAME) as marketplace_number,
      count(distinct SELLER_ADDRESS) as user_number,
      count(distinct NFT_ADDRESS) as total_NFT,
      avg(PRICE_USD) as average_seals, 
      sum(PRICE_USD)/marketplace_number as sum_per_market
        
      from 
      optimism.core.ez_nft_sales
      `
    }


    //

  }

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
