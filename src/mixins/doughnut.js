
export const doughnutChartMixin = {
    data() {
        return {
            defaultChartData: {
                labels: ['loading...'],
                datasets: [{
                    backgroundColor: ["#ccc"],
                    data: [1]
                }]
            },
        }
    },
    computed: {
        DoughnutChartData() {
            let _data = this.$store.getters[`${this.namespace}/getQueries`][this.queryName];
            if (!_data?.result?.records) return this.defaultChartData;
            _data = _data.result.records;
            // filter by global functions.
            if (this.slice) _data = _data.slice(0, this.slice);
            if (this.groupBy && Object.keys(this.groupBy).length) _data = this.groupByHandler(this.groupBy.by, _data);
            if (this.sort && Object.keys(this.sort).length) _data.sort(this.sortHandler);
            if (this.sortDate && Object.keys(this.sortDate).length) _data.sort(this.sortDateHandler);
            if (this.someInGroup && Object.keys(this.someInGroup).length) _data = this.sumInGroupHandler(this.someInGroup.by, this.someInGroup.over, _data);

            return {
                labels: Object.keys(_data),
                datasets: [{
                    data: Object.values(_data),
                    backgroundColor: this.colors,
                }]
            }
        }
    },
    methods: {
    }
}