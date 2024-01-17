
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import SingleChart from "./modules/singleChart";
import LineChart from "./modules/lineChart";
import BarChart from "./modules/barChart";
import DoughnutChart from "./modules/doughnutChart";
import MixedChart from "./modules/mixedChart";
import DataTable from "./modules/table";

export const store = new Vuex.Store({
    modules: {
        SingleChart,
        LineChart,
        BarChart,
        DoughnutChart,
        MixedChart,
        DataTable
    },
});
