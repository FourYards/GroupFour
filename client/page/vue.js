import Vue from 'vue';
import VueLandingPage from './Vue.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  el: '#vue-root-component',
  render: (h) => h(VueLandingPage),
});
