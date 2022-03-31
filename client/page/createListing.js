import Vue from 'vue';
import '../vuePlugins.js';
import createListing from './createListing.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(createListing),
});
