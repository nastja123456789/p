import Vue from 'vue'
//import VueRouter from 'vue-router'
import {BootstrapVue} from 'bootstrap-vue'
import Master from '@/components/layouts/Master'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

    new Vue({
      router: router,
      render: h => h(Master),
      components: {Master}
    }).$mount('#app')
