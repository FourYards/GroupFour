import Vue from 'vue';
import '../vuePlugins.js';
import AddFundsPage from './AddFunds.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(AddFundsPage),
});
