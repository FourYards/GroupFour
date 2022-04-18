import Vue from 'vue';
import '../vuePlugins.js';
import AdminDashboard from './AdminDashboard.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(AdminDashboard),
});
