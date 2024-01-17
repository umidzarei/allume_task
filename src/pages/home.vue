<template>
  <div class="row">
    <div calss="col-12">
      <h2 class="mt-10">Allume Task</h2>
      <p>
        The data have been extracted from https://console.chainbase.com/ you can
        check query below:
      </p>
      <img src="@/assets/images/code.png" alt="" style="width: 100%" />
      <p style="margin-top: 50px">
        100 transfer of WETH have been extracted between '2023-12-11' and
        '2023-12-12' And at the end the price of WETH have been extracted via
        CoinGecko and the USD volume of each transfer have been calculated.
      </p>
    </div>
    <div
      style="margin-top: 50px"
      class="d-flex flex-column justify-center align-center w-100"
      v-if="loading || loadingPrice"
    >
      <div>
        <scale-loader color="rgb(243, 31, 48)"></scale-loader>
      </div>
      <div>fetching data ...</div>
    </div>
    <div class="col-12" v-if="!loading && !loadingPrice">
      <vs-table ref="table">
        <template #thead>
          <vs-tr>
            <vs-th> # </vs-th>
            <vs-th v-for="(header, i) in result.columns" :key="i">
              {{ header.name }}
            </vs-th>
            <vs-th> price </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr v-for="(d, x) in result.data" :key="x">
            <vs-td>
              {{ x + 1 }}
            </vs-td>
            <vs-td v-for="(header, i) in result.columns" :key="i">
              {{ d[i] }}
            </vs-td>
            <vs-td>
              <span
                style="
                  white-space: nowrap;
                  display: inline-block;
                  text-wrap: none;
                "
              >
                {{ d[d.length - 1] * price + " $" }}
              </span>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
export default {
  data() {
    return {
      loadingPrice: true,
      loading: true,
      price: 0,
      execution_id: "",
      result: {},
    };
  },
  mounted() {
    this.getTokenPrice();
    this.executeQuery();
  },
  methods: {
    async getTokenPrice() {
      try {
        this.loadingPrice = true;
        await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
        )
          .then((response) => response.json())
          .then((data) => {
            this.price = data?.market_data.current_price?.usd;
            this.loadingPrice = false;
          });
      } catch (e) {
        console.log(e);
      }
    },
    async executeQuery() {
      try {
        const { data } = await this.$http.post("query/120013/execute", {
          headers: {
            Accept: "application/json",
          },
        });
        this.execution_id = data.data[0].executionId;
        this.checkStatus();
      } catch (e) {
        console.log(e);
      }
    },
    async checkStatus() {
      try {
        const {
          data: { data },
        } = await this.$http.get(`/execution/${this.execution_id}/status`, {
          headers: {
            Accept: "application/json",
          },
        });
        if (data[0].status !== "FINISHED" && data[0].status !== "FAILED") {
          this.checkStatus();
        } else {
          this.getResults();
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getResults() {
      try {
        const {
          data: { data },
        } = await this.$http.get(`/execution/${this.execution_id}/results`, {
          headers: {
            Accept: "application/json",
          },
        });
        this.result = data;
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    ScaleLoader: ScaleLoader,
  },
};
</script>
