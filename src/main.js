import Vue from 'vue';
import App from './App.vue';
// The app shell (router + store) comes from the active theme.
// @theme resolves to src/themes/<VUE_APP_THEME> (default: the-gate) — see vue.config.js.
import { router, store } from '@theme';
import NowUiKit from './plugins/now-ui-kit';

Vue.config.productionTip = false;

Vue.use(NowUiKit);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
