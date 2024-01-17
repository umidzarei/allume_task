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

        <vs-card type="0" class="mb-4 transparent">
            <template #title>
                <div class="d-flex align-center justify-space-between pt-2">
                    <div class="fw-600">
                        <div>{{ label }}</div>
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
                    <DoughnutChartGenerator :options="chartOptions" :data="DoughnutChartData" :id="chartId"
                        :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
                        :width="width" :height="height" />
                </div>
            </template>
        </vs-card>

    </div>
</template>


<script>
// import { Doughnut } from 'vue-chartjs/legacy';
import { Doughnut as DoughnutChartGenerator } from 'vue-chartjs';
import { doughnutChartMixin } from "@/mixins/doughnut"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
    name: 'DoughnutChart',
    mixins: [doughnutChartMixin],
    props: {
        chartId: {
            type: String,
            default: 'doughnut-chart'
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
            default: 400
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
        someInGroup: {
            type: Object,
            default: () => { }
        },
        label: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            sqlDialog: false,
            namespace: "DoughnutChart",
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        enabled: true,
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
                }
            }
        }
    },
    components: {
        DoughnutChartGenerator
    },
    mounted() {
        this.sendFlipSideApi();
    }
}
</script>

<style scoped>

</style>