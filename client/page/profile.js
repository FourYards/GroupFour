import Vue from 'vue';
import '../vuePlugins.js';
import ProfilePage from './UpdateProfile.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(ProfilePage),
});
