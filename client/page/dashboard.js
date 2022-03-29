import Vue from 'vue';
import '../vuePlugins.js';
import DashboardPage from './Dashboard.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(DashboardPage),
});
