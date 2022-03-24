/**
 * Vue plugins that need to be avaialable on all pages should be initialized
 * with Vue.use() in this file.
 */

import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import Fragment from 'vue-fragment';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(VueCompositionAPI);
Vue.use(Fragment.Plugin);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
