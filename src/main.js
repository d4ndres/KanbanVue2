import Vue from 'vue'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import './style.css'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false



new Vue({
  store,
  render: function (h) { return h(App) },
}).$mount('#app')
