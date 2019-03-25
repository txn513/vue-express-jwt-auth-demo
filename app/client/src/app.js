import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MuseUI from 'muse-ui';
import store from './store'
// import VueAxios from 'vue-axios'
import 'muse-ui/dist/muse-ui.css';
import 'typeface-roboto'

Vue.use(MuseUI)

// Vue.use(VueAxios,axios);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})