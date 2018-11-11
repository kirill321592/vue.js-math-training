import Vue from 'vue'
import App from './App.vue'

import AppMsg from './components/msg.vue'
import AppQst from './components/quest.vue'
import AppStart from './components/startsc.vue'
import AppResult from './components/result.vue'

Vue.component('AppMsg',AppMsg);
Vue.component('AppQst',AppQst);
Vue.component('AppStart',AppStart);
Vue.component('AppResult',AppResult);

new Vue({
  el: '#app',
  render: h => h(App)
})
