import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import router from './routes';
import { store } from "./store/Store"

Vue.config.productionTip = false

Vue.use(Vuesax);

import "./assets/styles/index.scss";

import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition);


// axios 
import axios from 'axios';
import VueAxios from 'vue-axios';
const axiosInstance = axios.create({
  baseURL: 'https://api.chainbase.com/api/v1/',
  headers: {
    "content-type":"application/json",
    "Accept": "application/json",
    "x-api-key": "2WcXt7YxB0xmsxkjDqLXucs5oXv"
  },
  withCredentials: true,
});
axiosInstance.defaults.headers={
    "content-type":"application/json",
    "Accept": "application/json",
    "x-api-key": "2WcXt7YxB0xmsxkjDqLXucs5oXv"
};
Vue.use(VueAxios, axiosInstance);



// mixins 
import { flipSide } from "./mixins/flipside";
Vue.mixin(flipSide);


// filters
import { formatNumber } from "./filter/formatNumber";
import { formatDate } from "./filter/formatDate";
Vue.filter("formatNumber", formatNumber);
Vue.filter("formatDate", formatDate);

import Layout from "@/components/layout.vue";
Vue.component("Layout", Layout);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
