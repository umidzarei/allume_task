<template>
    <div>

        <vs-dialog width="550px" not-center v-model="sqlDialog">
            <template #header>
                <h4 class="px-3 pt-2">
                    <b>SQL Statement</b>
                </h4>
            </template>

            <div class="con-content px-3">
                <code>
                   {{ query.sql }}
               </code>
            </div>

            <template #footer>
                <div class="con-footer mt-5 d-flex justify-end">
                    <vs-button @click="sqlDialog = false" dark transparent class="px-6">
                        Exit
                    </vs-button>
                </div>
            </template>
        </vs-dialog>

        <vs-card type="0" class="mb-4 w-100 transparent">
            <template #title>
                <div class="d-flex align-center justify-space-between pt-2">
                    <div class="fw-600">
                        <div>{{ title }}</div>
                        <div class="muted-text smaller fw-400 mt-1">
                            <span>Last Updated:</span>
                            <span class="ml-1">{{ updatedAt }}</span>
                        </div>
                    </div>
                    <vs-tooltip>
                        <button @click="sqlDialog = true">
                            <i class="isax isax-code muted"></i>
                        </button>
                        <template #tooltip>
                            SQL Code
                        </template>
                    </vs-tooltip>
                </div>
            </template>
            <template #text>
                <div class="mt-4 chart-container">
                    <LineChartGenerator :options="chartOptions" :data="lineChartData" :chart-id="chartId"
                        :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
                        :width="width" :height="height" />
                </div>
            </template>
        </vs-card>

    </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs';
import 'chartjs-adapter-moment';
import { lineChartMixin } from "../../mixins/lineChart";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, TimeScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, TimeScale)

export default {
    name: 'LineChart',
    mixins: [lineChartMixin],
    props: {
        chartId: {
            type: String,
            default: 'line-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 220
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Array,
            default: () => []
        },
        chartTitle: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        queryName: {
            type: String,
            default: ""
        },
        slice: {
            type: Number,
            default: 0
        },
        sort: {
            type: Object,
            default: () => { } // {by : "col-nam",  type :'asc' }
        },
        sortDate: {
            type: Object,
            default: () => { } // {by : "col-nam",  type :'asc' }
        },
        groupBy: {
            type: Object,
            default: () => { }
        },
        axis: {
            type: Object,
            required: true
        },
        label: {
            type: String,
            default: ""
        },
        yScale: {
            type: Object,
            default: () => {
                return {}
            }
        },
        pointRadius: {
            type: Number,
            default: 0,
        },
        stacked: { // shows number of overlay data
            type: Object,
            default: () => {
                return { number: 1, column: '', order: [] }
            }
        },
        stackedColumn: { // required if stacked > 1,
            type: String,
            default: "",
        },
        chartColors: {
            type: Number,
            default: 1,
        },
        forceStacked: {
            type: Boolean,
            default: false
        },
        xType: {
            type: String,
            default: "category",
        },
        xTitle: {
            type: String,
            default: ""
        }
    },

    data() {
        return {
            sqlDialog: false,
            namespace: "LineChart",
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                // parsing: {
                //     xAxisKey: this.axis.x,
                //     yAxisKey: this.axis.y
                // },
                plugins: {
                    title: {
                        display: true,
                        text: this.chartTitle
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        padding: {
                            left: 25,
                            right: 25,
                            top: 15,
                            bottom: 15
                        },
                        caretPadding: 10,
                        cornerRadius: 12,
                        boxWidth: 20,
                        boxPadding: 6,
                        borderColor: "rgba(0,0,0,0)",
                        titleMarginBottom: 10,
                        titleFont: {
                            size: 14
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        type: this.xType,
                        // ticks: {
                        //     callback: function (label) {
                        //         return label / 1000 + 'k';
                        //     }
                        // },
                        stacked: this.forceStacked, // for line chart better never to stack data
                        display: true,
                        border: {
                            display: true,
                            color: "#999",
                            padding: 10,
                            width: 1,
                            // dashOffset: 30
                        },
                        grid: {
                            display: true,
                            // circular: true,
                            tickBorderDash: [2, 3],
                            lineWidth: 1,
                            offset: true,
                            tickBorderDashOffset: 5,
                            tickColor: "#ccc",
                            tickWidth: 1,
                            tickLength: 30
                            // drawOnChartArea : false
                        },

                        title: {
                            display: Boolean(this.xTitle),
                            text: this.xTitle,
                            padding: 10,
                            color: "#2c3e5",
                            font: {
                                size: 30
                            }
                        },
                        ticks: {
                            // backdropPadding: 50,
                            color: '#777',

                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        stacked: this.forceStacked,  // for line chart better never to stack data
                        display: true,
                        border: {
                            display: true,
                            color: "#999",
                            width: 1,
                            // dashOffset: 30
                        },
                        title: {
                            display: false,
                            text: this.axis.y,
                            padding: 10,
                            color: "#2c3e5",
                        },
                        ticks: {
                            // backdropPadding: 50,
                            color: '#777',
                            callback: (label) => this.formatXAxis(label),
                            // callback: function (label) {
                            //     return this.formatNumber(label)
                            //     // return label / 1000 + 'k';
                            // },
                            font: {
                                size: 12
                            }
                        },
                        suggestedMin: this.yScale.min || false,
                        suggestedMax: this.yScale.max || false
                    }
                },
                elements: {
                    point: {
                        radius: this.pointRadius
                    }
                }
            }
        }
    },
    mounted() {
        this.sendFlipSideApi();
    },
    methods: {

    },
    components: {
        LineChartGenerator
    }
}
</script>

<style scoped>

</style>