import Vue from 'vue';
import store from './store'
import App from './App.vue';
import axios from 'axios';
import VueMaterial from 'vue-material';
import router from './router'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/de';

Vue.use(VueMaterial)

Vue.prototype.$http = axios
Vue.config.productionTip = false

// Filter that transform text to uppercase.
Vue.filter('uppercase', function(value) {
  return value.toUpperCase();
});

// Filter for cutting off strings that are too long.
Vue.filter('truncate', function(value) {
var length = 60;

if(value.length <= length) {
  return value;
} else {
  return value.substring(0, length) + '...';			
}
});    

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app')
