import Vue from 'vue'
import App from './App.vue'

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
  render: h => h(App)
}).$mount('#app')
