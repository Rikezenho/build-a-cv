import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.App = new Vue({
  render: h => h(App),
}).$mount('#app')
