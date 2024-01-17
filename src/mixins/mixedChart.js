
export const mixedChartMixin = {
    data() {
        return {
            defaultChartData: {
                labels: ['one', 'two', 'three'], // as xAxis
                datasets: [
                    {
                        type: 'line',
                        label: 'loading...',
                        data: [],
                        backgroundColor: 'rgba(21,91,255,0.4)',
                        borderColor: 'rgba(21,91,255, 0.7)',
                    },

                ]
            },
        }
    },
    computed: {
        mixedChartData() {

            let _data = this.$store.getters[`${this.namespace}/getQueries`][this.queryName];
            if (!_data?.result?.records) return this.defaultChartData;

            _data = _data.result.records;
            // filter by global functions
            if (this.slice) _data = _data.slice(0, this.slice);
            if (this.groupBy && Object.keys(this.groupBy).length) _data = this.groupByHandler(this.groupBy.by, _data);
            if (this.sort && Object.keys(this.sort).length) _data.sort(this.sortHandler);
            if (this.sortDate && Object.keys(this.sortDate).length) _data.sort(this.sortDateHandler);

            let _chartsDataset = [];
            let c = 0;
            if (this.queryName == "Daily-bridged-out-Luna") {
                // console.log(_data);
            }
            while (c < this.charts.length) {
                let _chr = this.charts[c];
                _chartsDataset.push({
                    type: _chr.type,
                    label: _chr.label,
                    data: _data.map(el => el[_chr.value]),
                    borderColor: this.colors[c],
                    backgroundColor: this.colors[c],
                    order: this.charts.indexOf(_chr),

                })
                c++;
            }
            return {
                labels: _data.map(el => this.$options.filters.formatDate(el[this.axis.x], "date")),
                datasets: _chartsDataset
            }
        }
    },
    methods: {}
}