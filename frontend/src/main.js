import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BaseLayout from "@/components/layouts/BaseLayout"
import HomeLayout from "@/components/layouts/HomeLayout"
//import CIcon from "@/components/CIcon"
import axios from 'axios'
import moment from 'moment'
import store from "./store"

// Vuelidate - form validation plugin
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast, {
  // options
  //timeout: 4000,  // false to prevent auto hide
  position: 'top-center',
  containerClassName: ['CToast']
});

// perfect scroll bar
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

// font awesome icon
import '@/assets/font-awesome/css/font-awesome.min.css'
// style
import '@/assets/css/style.scss'

Vue.use(PerfectScrollbar)

// import form validation
import '@/helpers/validation';

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.component('base-layout', BaseLayout)
Vue.component('home-layout', HomeLayout)
//Vue.component('c-icon', CIcon)

Vue.filter('timeAgo', (val) => {
  return moment(val).fromNow();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
