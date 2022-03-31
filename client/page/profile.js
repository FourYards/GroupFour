import Vue from 'vue';
import '../vuePlugins.js';
import ProfilePage from './Profile.vue';

new Vue({
  el: '#vue-root-component',
  render: (h) => h(ProfilePage),
});
