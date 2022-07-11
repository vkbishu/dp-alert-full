/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================
 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import axios from "axios"
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/starterRouter";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = sessionStorage.getItem('_act_m');
  if(token){
      config.headers['Adm-Access-Token'] = token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // Do something with the response
  return response;
}, function (error) {
  // Do something with request error
  if(error.response.status == 401){
      sessionStorage.removeItem('_act_m');
      window.location.href = '/hackpanel/';
  }
  return Promise.reject(error);
});

Vue.prototype.$http = instance;

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
