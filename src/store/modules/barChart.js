
const state = {
  queries: {
    //General
    "general": {
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
    "fee": {
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
    "fee_2": {
      result: null,
      sql: `select 
      avg(TX_COUNT) as average_per_block , 
      avg(TOTAL_DIFFICULTY) as TOTAL_DIFFICULTY_per_block, 
      avg(GAS_USED) as GAS_USED_per_block, 
      avg(GAS_LIMIT) as GAS_LIMIT_per_block, 
      avg(SIZE) as SIZE_per_block, 
    
    date_trunc('week',BLOCK_TIMESTAMP ) as DATE from 
    optimism.core.fact_blocks
    group by date
    order by date`
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
      group by date`
    },
    "stake_2": {
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
    },
    "nft": {
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
      group by 2`
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
    },
    "bridge": {
      result: null,
      sql: `SELECT sum(AMOUNT) as bridge, date_trunc('week', block_timestamp) as date from ethereum.core.ez_eth_transfers
      where 
      ETH_from_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      ETH_from_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC')
    group by 2 
    order by 2 asc`
    },
    "bridge_2": {
      result: null,
      sql: `SELECT sum(AMOUNT) as bridge, date_trunc('week', block_timestamp) as date from ethereum.core.ez_eth_transfers
      where 
      ETH_TO_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      ETH_TO_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC')
    group by 2 
    order by 2 asc`
    },
    "bridge_in": {
      result: null,
      sql: `(SELECT sum(AMOUNT_USD) token,SYMBOL from ethereum.core.ez_token_transfers
      where 
      SYMBOL!='OP' AND AMOUNT_USD IS NOT NULL AND
      (from_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      from_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC'))
     
    group by 2 
    order by 1 desc)
    
    UNION  
    (
    SELECT SUM(AMOUNT)*30 AS token, SYMBOL   from ethereum.core.ez_token_transfers
      where  
      SYMBOL='OP'  AND
      (from_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      from_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC'))
    GROUP BY 2)
    ORDER BY token DESC`
    },
    "bridge_out": {
      result: null,
      sql: `(SELECT sum(AMOUNT_USD) token,SYMBOL from ethereum.core.ez_token_transfers
      where 
      SYMBOL!='OP' AND AMOUNT_USD IS NOT NULL AND
      (to_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      to_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC'))
     
    group by 2 
    order by 1 desc)
    
    UNION  
    (
    SELECT SUM(AMOUNT)*30 AS token, SYMBOL   from ethereum.core.ez_token_transfers
      where  
      SYMBOL='OP'  AND
      (to_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      to_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC'))
    GROUP BY 2)
    ORDER BY token DESC`
    },
    "bridge_in_last_week": {
      result: null,
      sql: `(SELECT sum(AMOUNT_USD) token,SYMBOL from ethereum.core.ez_token_transfers
      where 
      SYMBOL!='OP' AND AMOUNT_USD IS NOT NULL AND
    (	(from_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      from_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC'))) and BLOCK_TIMESTAMP>CURRENT_DATE-7
     
    group by 2 
    order by 1 desc)
    
    UNION  
    (
    SELECT SUM(AMOUNT)*30 AS token, SYMBOL   from ethereum.core.ez_token_transfers
      where  
      SYMBOL='OP'  AND
      (from_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      from_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC')) and BLOCK_TIMESTAMP>CURRENT_DATE-7
    GROUP BY 2)
    ORDER BY token DESC`
    },
    "bridge_out_last_week": {
      result: null,
      sql: `(SELECT sum(AMOUNT_USD) token,SYMBOL from ethereum.core.ez_token_transfers
      where 
      SYMBOL!='OP' AND AMOUNT_USD IS NOT NULL AND
      (to_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      to_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC')) and BLOCK_TIMESTAMP>CURRENT_DATE-7
     
    group by 2 
    order by 1 desc)
    
    UNION  
    (
    SELECT SUM(AMOUNT)*30 AS token, SYMBOL   from ethereum.core.ez_token_transfers
      where  
      SYMBOL='OP'  AND
      (to_ADDRESS=lower('0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1')
    OR
      to_ADDRESS=lower('0x52ec2F3d7C5977A8E558C8D9C6000B615098E8fC')) and BLOCK_TIMESTAMP>CURRENT_DATE-7
    GROUP BY 2)
    ORDER BY token DESC`
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
