import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store/index'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import './style.css'

Vue.use(Vuex)
Vue.use(VueCompositionAPI)


Vue.config.productionTip = false



new Vue({
  store,
  render: function (h) { return h(App) },
}).$mount('#app')
