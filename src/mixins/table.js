export const tableMixin = {

    data() {
        return {

        }
    },
    computed: {
        tableData() {
            let _data = this.$store.getters[`${this.namespace}/getQueries`][this.queryName];
            if (!_data?.result?.records) return [];
            if (this.queryName === "The-top-20-addresses-with-the-most-bridged-out-Luna") {
                // console.log(_data.result.records);
            }
            return _data.result.records;
        }
    },
}