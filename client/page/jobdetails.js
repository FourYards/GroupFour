import Vue from 'vue';
import '../vuePlugins.js';
import JobDetailsPage from './JobDetails.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(JobDetailsPage),
});
