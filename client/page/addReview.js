import Vue from 'vue';
import '../vuePlugins.js';
import AddReview from './AddReview.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(AddReview),
});
