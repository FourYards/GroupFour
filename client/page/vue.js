import Vue from 'vue';
import VueLandingPage from './Vue.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(VueLandingPage),
});
