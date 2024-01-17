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
        <vs-card type="0" class="w-100 single-chart-card " :class="{ 'card-loading': !singleChartData }">
            <template #title>
                <div class="d-flex justify-space-between pt-2" style="min-height : 5rem ">
                    <div class="fw-600">
                        <div>{{ title }}</div>
                        <div class="muted-text smaller fw-400 mt-1">
                            <span>Last Updated:</span>
                            <span class="ml-2">{{ updatedAt }}</span>
                        </div>
                    </div>
                    <vs-tooltip style="align-self : start">
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
                <div class="mt-4 text-center">
                    <div class="muted-text">
                        <span>{{ name }}</span>
                    </div>
                    <h6 class="" style="font-size : 2.3rem !important;">
                        <span v-if="singleChartData">{{ singleChartData }}</span>
                        <span v-else>---</span>
                        <!-- <span v-if="result?.rows && result.rows[0]">
                            {{ result?.rows[0][column] | formatNumber(type) }}
                        </span>
                        <span v-else>---</span> -->
                    </h6>
                </div>
            </template>
        </vs-card>
    </div>

</template>


<script>
import { singleChartMixin } from '@/mixins/singleChart';
export default {
    mixins: [singleChartMixin],
    props: {
        title: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: "",
        },
        queryName: {
            type: String,
            default: ""
        },
        column: {
            type: String,
            default: "0"
        },
        type: {
            type: String,
            default: "number"
        }
    },
    data() {
        return {
            sqlDialog: false,
            namespace: "SingleChart"
        }
    },
    methods: {

    },
    mounted() {
        this.sendFlipSideApi();
    }
}
</script>

<style scoped lang="scss">
.vs-card-header {
    button {
        outline: none !important;
        background-color: transparent !important;
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
    }
}
</style>