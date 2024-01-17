
export const singleChartMixin = {
    data() {
        return {

        }
    },
    computed: {
        singleChartData() {
            let _data = this.$store.getters[`${this.namespace}/getQueries`][this.queryName];
            if (_data.result && _data.result.rows) {
                if(this.queryName === "the-total-volume-of-bridged-out-Luna") {
                    // console.log(_data.result);
                }
                return this.$options.filters.formatNumber(_data.result?.rows[0][this.column], this.type);
            } else {
                return null
            }
        }
    },
    methods: {}
}