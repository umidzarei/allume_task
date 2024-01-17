
export const barChartMixin = {
    data() {
        return {
            defaultChartData: {
                labels: [],
                datasets: [{
                    label: 'loading ...',
                    backgroundColor: ['rgba(21,91,255,0.8)'],
                    data: []
                }]
            },
        }
    },
    computed: {
        barChartData() {
            // ! if we need stacked (multiple data) we must use group by.
            // ! if we use group by typeof _data is object

            let _data = this.$store.getters[`${this.namespace}/getQueries`][this.queryName];
            if (!_data?.result?.records) return this.defaultChartData;

            _data = _data.result.records;

            if (this.queryName == "Daily-bridge-out-active-users") {
                // console.log("A", _data);
            }


            // filter by global functions.
            if (this.slice) _data = _data.slice(0, this.slice);
            if (this.groupBy && Object.keys(this.groupBy).length > 0) _data = this.groupByHandler(this.groupBy.by, _data);
            if (this.sort && Object.keys(this.sort).length > 0) _data.sort(this.sortHandler);
            if (this.sortDate && Object.keys(this.sortDate).length > 0) _data.sort(this.sortDateHandler);
            if (this.someInGroup && Object.keys(this.someInGroup).length) _data = this.sumInGroupHandler(this.someInGroup.by, this.someInGroup.over, _data);

            // works for single data chart
            if (this.stacked.number > 1) { // * as mentioned, _data is object, and we used group by for stack

                if (this.groupBy && Object.keys(this.groupBy).length > 0) { // ? stacked but not group by
                    var _chart = {
                        labels: [],
                        datasets: []
                    }
                    _chart.labels = Object.keys(_data)
                    var j = 0;
                    let arr = Object.values(_data);
                    let _allData = [];
                    while (j < arr.length) {
                        arr[j]; // => array with 3 object
                        let d = 0;
                        while (d < this.stacked.number) {
                            _allData.push(arr[j][d]);
                            d++;
                        }
                        j++;
                    }

                    let i = 0;
                    while (i < this.stacked.number) {

                        let _stacked = this.stacked;
                        _chart.datasets.push({
                            label: this.stacked.order[i],
                            borderColor: this.colors[i],
                            backgroundColor: this.colors[i],
                            data: _allData.filter(function (el) {
                                if (el && el[_stacked.column] === _stacked.order[i]) {
                                    // console.log("H", el[_stacked.column]);
                                    return true
                                }
                                return false;
                            }),
                            tension: 0.4,
                            borderWidth: 2,
                            borderRadius: 10,
                            order: this.stacked.order.indexOf(this.stacked.order[i]) > -1 ? this.stacked.order.indexOf(this.stacked.order[i]) : 100
                        })
                        i++;
                    }

                    return _chart;
                } else {

                    if (this.someInGroup && Object.keys(this.someInGroup).length) {
                        return {
                            labels: Object.keys(_data),
                            datasets: [{
                                data: Object.values(_data),
                                backgroundColor: this.colors,
                                label: this.label,
                                borderWidth: 0,
                                borderRadius: 4,
                            }]
                        }
                    }

                    let _chart = {
                        labels: _data.map(el => this.$options.filters.formatDate(el[this.axis.x], "date")), // as xAxis,
                        datasets: []
                    }
                    let i = 0;
                    while (i < this.stacked.number) {
                        _chart.datasets.push({
                            label: this.stacked.order[i],
                            borderColor: this.colors[i],
                            backgroundColor: this.colors[i],
                            data: _data.map(el => el[this.stacked.order[i]]),
                            tension: 0.4,
                            borderWidth: 0,
                            borderRadius: 4,
                            order: this.stacked.order.indexOf(this.stacked.order[i])
                        })
                        i++;
                    }
                    // if (this.queryName == "Daily-staking-and-unstacking-number") {
                    //     _data.map(el => {
                    //         console.log(el);
                    //     })

                    // }
                    return _chart;
                }

            } else {  // * _data is array and not grouped, we just maybe sort it
                if (this.someInGroup && Object.keys(this.someInGroup).length) {
                    return {
                        labels: Object.keys(_data),
                        datasets: [{
                            data: Object.values(_data),
                            // backgroundColor: this.colors,                     
                            backgroundColor: this.colorGenerator(),
                            label: this.label,
                            borderWidth: 0,
                            borderRadius: 4,
                        }]
                    }
                }

                return {
                    labels: this.dotFormatDate ? _data.map(el => el[this.axis.x]) : _data.map(el => this.$options.filters.formatDate(el[this.axis.x], 'date')),
                    datasets: [{
                        label: this.label,
                        // backgroundColor: ['rgba(21,91,255,0.8)'],
                        backgroundColor: this.colorGenerator(),
                        data: _data.map(el => el[this.axis.y]),
                        borderWidth: 0,
                        borderRadius: 4,
                    }]
                }
            }

        }
    },
    methods: {
    }
}