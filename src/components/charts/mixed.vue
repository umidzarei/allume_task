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
                <div class="mt-4">
                    <MixedChart :data="mixedChartData" :options="chartOptions" />
                </div>
            </template>
        </vs-card>
    </div>
</template>

<script>
import { mixedChartMixin } from '@/mixins/mixedChart';
import { Bar as MixedChart } from 'vue-chartjs';
import ChartJS from "chart.js/auto";
import { Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    mixins: [mixedChartMixin],
    props: {

        title: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: "",
            required: true
        },
        axis: {
            type: Object,
            required: true,
        },
        queryName: {
            type: String,
            default: ""
        },
        stacked: { // shows number of overlay data
            type: Number,
            default: 1
        },
        stackedColumn: { // required if stacked > 1,
            type: String,
            default: ""
        },
        stackedOrder: {
            type: Array,
            default: () => []
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
        charts: {
            type: Array,
            required: true
        },
        pointRadius: {
            type: Number,
            default: 0
        }

    },
    data() {
        return {
            sqlDialog: false,
            namespace: "MixedChart",

            chartOptions: {
                interaction: {
                    intersect: false,
                },
                responsive: true,
                plugins: {
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

                scales: {
                    x: {
                        // stacked: Boolean(this.stacked - 1), // stacked start from 1
                        alignToPixels: true,
                        weight: 10,
                        title: {
                            display: true,
                            text: this.capitalize(this.axis.x),
                            padding: 10,
                            color: "#2c3e5",
                            font: {
                                size: 30
                            }
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
                        ticks: {
                            // backdropPadding: 50,
                            color: '#777',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        // stacked: Boolean(this.stacked - 1), // stacked start from 1
                        title: {
                            display: false,
                            text: this.capitalize(this.axis.y),
                            padding: 10,
                            color: "#2c3e5",
                        },
                        ticks: {
                            // backdropPadding: 50,
                            color: '#777',
                            font: {
                                size: 12
                            }
                        }
                    },


                },
                elements: {
                    point: {
                        radius: this.pointRadius
                    }
                }
            }
        }
    },
    components: {
        MixedChart,
    },
    mounted() {
        this.sendFlipSideApi();
    }
}
</script>


<style scoped>

</style>