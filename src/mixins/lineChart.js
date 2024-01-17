
export const lineChartMixin = {
    data() {
        return {
            defaultChartData: {
                // datasets: [{
                //     label: '',
                //     data: [],
                //     tension: 0.4,
                //     cubicInterpolationMode: 'monotone',
                //     borderColor: "#155bff",
                //     backgroundColor: '#155bbb',
                // }]
                labels: [], // as xAxis
                datasets: [{
                    label: 'loading ...',
                    backgroundColor: ['#ccc'],
                    data: []
                }]
            },
        }
    },
    computed: {
        lineChartData() {
            // ! if we need stacked (multiple data) we must use group by.
            // ! if we use group by typeof _data is object
            let _data = this.$store.getters[`${this.namespace}/getQueries`][this.queryName];
            if (!_data?.result?.records) return this.defaultChartData;

            _data = _data.result.records;

            // filter by global functions
            if (this.slice) _data = _data.slice(0, this.slice);
            if (this.groupBy && Object.keys(this.groupBy).length) _data = this.groupByHandler(this.groupBy.by, _data);
            if (this.sort && Object.keys(this.sort).length) _data.sort(this.sortHandler);
            if (this.sortDate && Object.keys(this.sortDate).length) _data.sort(this.sortDateHandler);


            if (this.stacked.number > 1) { // * as mentioned, _data is object, and we used group by for stack
                // if (!this.stackedColumn) throw new Error("stacked-column is required when stacked > 1");

                let _chart = {
                    labels: _data.map(el => el[this.axis.x]), // as xAxis,
                    datasets: []
                }
                let i = 0;
                if (this.queryName === "daily-stable-coins-supply-trend") {
                    console.log(_data);
                }
                while (i < this.stacked.number) {
                    _chart.datasets.push({
                        label: this.stacked.order[i],
                        borderColor: this.colors[i],
                        borderWidth: 1,
                        backgroundColor: this.colors[i],
                        data: _data.map(el => el[this.stacked.order[i]]),
                        tension: 0.4,
                        order: this.stacked.order.indexOf(this.stacked.order[i])
                    })
                    i++;
                }
                if (this.queryName === "daily-stable-coins-supply-trend") {
                    console.log(_chart);
                }
                return _chart;

            } else { // * _data is array and not grouped, we just maybe sort it.

                if (this.queryName === "Average_transaction_per_user") {
                    // console.log(_data.map(el => el[this.axis.y]));
                    // console.log(_data);
                }
                return {
                    labels: _data.map(el => el[this.axis.x]), // as xAxis
                    datasets: [{
                        label: this.axis.y,
                        borderColor: this.colorGenerator(),
                        backgroundColor: this.colorGenerator(),
                        data: _data.map(el => el[this.axis.y]),
                        tension: 0.4,
                        borderWidth: 2,
                    }]
                }
            }
        }
    },
    methods: {}
}