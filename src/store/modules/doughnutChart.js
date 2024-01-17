
const state = {
  queries: {
    'Distribution-of-stakers-based-on-how-near-they-have-on-staking-pools': {
      result: null,
      sql: `with ggg as
        (select 
        sum(case when ACTION='Stake' then STAKE_AMOUNT/1e24 else null end) as staking_volume, 
        sum(case when ACTION='Unstake' then STAKE_AMOUNT/1e24 else null end) as unstaking_volume,   
        TX_SIGNER
          from 
          near.core.dim_staking_actions
           
        group by TX_SIGNER
        )
        , 
          joon as 
        (select 
        case when staking_volume is null then 0 else staking_volume end as staking,
        case when unstaking_volume is null then 0 else unstaking_volume end as unstaking, 
        staking-unstaking as near_locked, 
        TX_SIGNER
        from ggg 
        order by near_locked desc )
        
        
        (select count(*) as number , '0-1' as range 
        from 
        joon
        where 
        near_locked between 0 and 1)
        
        union ALL
        
        (select count(*) as number , '1-10' as range 
        from 
        joon
        where 
        near_locked between 1 and 10)
        
        
        union ALL
        
        (select count(*) as number , '10-100' as range 
        from 
        joon
        where 
        near_locked between 10 and 100)
        
        
        union ALL
        
        (select count(*) as number , '100-1000' as range 
        from 
        joon
        where 
        near_locked between 100 and 1000)
        
        
        union ALL
        
        (select count(*) as number , '1000-10000' as range 
        from 
        joon
        where 
        near_locked between 1000 and 10000)
        
        
        union ALL
        
        (select count(*) as number , '10000-100000' as range 
        from 
        joon
        where 
        near_locked between 10000 and 100000)
        
        
        union ALL
        
        (select count(*) as number , '100000-1000000' as range 
        from 
        joon
        where 
        near_locked between 100000 and 1000000)
        
        
        
        union ALL
        
        (select count(*) as number , '1000000-10000000' as range 
        from 
        joon
        where 
        near_locked between 1000000 and 10000000)
        
        
        union ALL
        
        (select count(*) as number , '10000000-100000000' as range 
        from 
        joon
        where 
        near_locked between 10000000 and 100000000)`
    },
    'NFT-number-per-platform': {
      result: null,
      sql: `select 
      count(*) as number, 
      TX_RECEIVER 
      from 
      near.core.ez_nft_mints
      group by TX_RECEIVER
        order by number desc
      limit 20`
    },
    'Bridge-to-Ethereum-in-last-month': {
      result: null,
      sql: `--SQL credits to abbasian34-8158 GP winner NEAR meta analysis
      WITH bridge_to_near_or_aurora as (
      SELECT
      *
      FROM (
      SELECT
      *
      from ethereum.core.fact_transactions as transactions
      INNER JOIN
      (SELECT
      tx_hash as tx_hash_t,
      contract_address,
      amount_usd,
      raw_amount,
      symbol
      FROM ethereum.core.ez_token_transfers
      ) as transfers
      ON transactions.tx_hash=transfers.tx_hash_t
      WHERE (from_address = '0x23ddd3e3692d1861ed57ede224608875809e127f' 
        OR to_address = '0x23ddd3e3692d1861ed57ede224608875809e127f')
      AND SUBSTRING(INPUT_DATA,0,10) = '0x4a00c629'
          AND block_timestamp::date >= CURRENT_DATE - 30
      
      )
      )
      select
      DATE_TRUNC('day',block_timestamp) as date,
      COUNT(DISTINCT TX_HASH) as number_transactions,
      COUNT(DISTINCT FROM_ADDRESS) as unique_users,
      SUM(amount_usd) as usd_volume,
      symbol,
        CASE WHEN date >= '2022-11-07' THEN 'After' 
            WHEN date < '2022-11-07' THEN 'Before' END AS range
      FROM bridge_to_near_or_aurora
          WHERE block_timestamp::date >= CURRENT_DATE - 30
      GROUP BY date, symbol
      
      `
    },
    'Total-tokens-Bridge-to-Ethereum': {
      result: null,
      sql: `--SQL credits to abbasian34-8158 GP winner NEAR meta analysis
      WITH bridge_to_near_or_aurora as (
      SELECT
      *
      FROM (
      SELECT
      *
      from ethereum.core.fact_transactions as transactions
      INNER JOIN
      (SELECT
      tx_hash as tx_hash_t,
      contract_address,
      amount_usd,
      raw_amount,
      symbol
      FROM ethereum.core.ez_token_transfers
      ) as transfers
      ON transactions.tx_hash=transfers.tx_hash_t
      WHERE (from_address = '0x23ddd3e3692d1861ed57ede224608875809e127f' 
        OR to_address = '0x23ddd3e3692d1861ed57ede224608875809e127f')
      AND SUBSTRING(INPUT_DATA,0,10) = '0x4a00c629'
        
      
      )
      )
      select
      DATE_TRUNC('day',block_timestamp) as date,
      COUNT(DISTINCT TX_HASH) as number_transactions,
      COUNT(DISTINCT FROM_ADDRESS) as unique_users,
      SUM(amount_usd) as usd_volume,
      symbol,
        CASE WHEN date >= '2022-11-07' THEN 'After' 
            WHEN date < '2022-11-07' THEN 'Before' END AS range
      FROM bridge_to_near_or_aurora
      
      GROUP BY date, symbol`
    },
    'stake': {
      result: null,
      sql: `with gorges as 
      (select RAW_NEW_BALANCE/1e18-RAW_PREVIOUS_BALANCE/1e18 as volume , 
      case when volume<0 then 'unstake' else 'stake' end as type, 
      date_trunc('day',BLOCK_TIMESTAMP) as date, 
      DELEGATOR,TO_DELEGATE
      from 
      optimism.core.fact_delegations)
      
      , ggg as
      (select 
      sum(case when type in ('stake') then volume else null end) as staking_volume, 
      sum(case when type in ('unstake') then -1*volume else null end ) as unstaking_volume,   
      DELEGATOR
        from 
      gorges
         
      group by DELEGATOR
      )
      , 
        joon as 
      (select 
      case when staking_volume is null then 0 else staking_volume end as staking,
      case when unstaking_volume is null then 0 else unstaking_volume end as unstaking, 
      staking-unstaking as near_locked, 
      DELEGATOR
      from ggg 
      order by near_locked desc )
      
      
      (select count(*) as number , '0-1' as range 
      from 
      joon
      where 
      near_locked between 0 and 1)
      
      union ALL
      
      (select count(*) as number , '1-10' as range 
      from 
      joon
      where 
      near_locked between 1 and 10)
      
      
      union ALL
      
      (select count(*) as number , '10-100' as range 
      from 
      joon
      where 
      near_locked between 10 and 100)
      
      
      union ALL
      
      (select count(*) as number , '100-1000' as range 
      from 
      joon
      where 
      near_locked between 100 and 1000)
      
      
      union ALL
      
      (select count(*) as number , '1000-10000' as range 
      from 
      joon
      where 
      near_locked between 1000 and 10000)
      
      
      union ALL
      
      (select count(*) as number , '10000-100000' as range 
      from 
      joon
      where 
      near_locked between 10000 and 100000)
      
      
      union ALL
      
      (select count(*) as number , '100000-1000000' as range 
      from 
      joon
      where 
      near_locked between 100000 and 1000000)`
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
