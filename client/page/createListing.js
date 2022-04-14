import Vue from 'vue';
import '../vuePlugins.js';
import createListing from './CreateListing.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(createListing),
});
