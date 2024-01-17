
const state = {
    queries: {
        'daily-staking-reward-in-dollar': {
            result: null,
            sql: `with t1 as 
            (select sum(AMOUNT)/1e6 as Staking_rewards,date_trunc('day',BLOCK_TIMESTAMP) as date
            from 
            terra.core.ez_transfers
            where 
              MESSAGE_VALUE['@type'] ='/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'
              and 
              CURRENCY='uluna'
            group by date),
              t2 as 
            
            (select
              avg(CLOSE) as price, date_trunc('day',RECORDED_HOUR) as datee from 
            crosschain.core.fact_hourly_prices
            where 
            ID = 'terra-luna-2'
            group by datee),
              
            t3 as
            (select *,STAKING_REWARDS*PRICE as sTAKING_REWARDS_USD from t1 a inner join t2 b
            on a.date=b.datee)
            
            select *, 
            sum(sTAKING_REWARDS_USD) over (order by date) as cumulative_sTAKING_REWARDS
            from t3 order by date asc`
        },
        'Daily-bridged-out-Luna': {
            result: null,
            sql: `with bridge_out as
            (select date_trunc('day',BLOCK_TIMESTAMP) as date,MESSAGE_VALUE['sender'] as senderr, MESSAGE_VALUE['receiver'] as receiverr,(AMOUNT/1e6) as volume, 
              case 
              when SUBSTR(receiverr, 0, 4) = 'osmo' then 'osmo' 
              when SUBSTR(receiverr, 0, 4) = 'axel' then 'axelar' 
              when SUBSTR(receiverr, 0, 4) = 'grav' then 'GRAV' 
              when SUBSTR(receiverr, 0, 4) = 'secr' then 'secret' 
              when SUBSTR(receiverr, 0, 4) = 'terr' then 'terra' 
              when SUBSTR(receiverr, 0, 3) = 'cre' then 'CRE'
              when SUBSTR(receiverr, 0, 3) = 'sif' then 'SIF'
              when SUBSTR(receiverr, 0, 4) = 'kuji' then 'kujira'
              when SUBSTR(receiverr, 0, 4) = 'cosm' then 'cosmos'
              when SUBSTR(receiverr, 0, 4) = 'evmo' then 'evmos'
              when SUBSTR(receiverr, 0, 4) = 'stri' then 'STRI'
              when SUBSTR(receiverr, 0, 4) = 'juno' then 'juno'
              else null end as blockchain
              
            from terra.core.ez_transfers
            where 
            MESSAGE_TYPE='/ibc.applications.transfer.v1.MsgTransfer' and CURRENCY='uluna'),
            
            sda as 
            (select count(*) as number, sum(VOLUME) as volume ,avg(volume) as d, count(distinct SENDERR) as active_users ,DATE from bridge_out 
            group by 5),
             hkk as
            (select sum(volume) over (order by date) as Cumulative_volume ,
             * 
            from sda)
            select * from hkk order by date asc`
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
