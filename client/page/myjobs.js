import Vue from 'vue';
import '../vuePlugins.js';
import MyJobsPage from './MyJobs.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(MyJobsPage),
});
