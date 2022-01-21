import Vue from 'vue';
import Buefy from 'buefy';
import VueI18n from 'vue-i18n';

import App from './App.vue';
import router from './router';
import store from './store';
import * as api from './api';
import Utils from './utils';

// Internationalisation.
Vue.use(VueI18n);
const i18n = new VueI18n();

Vue.use(Buefy, {});
Vue.config.productionTip = false;

// Globals.
Vue.prototype.$utils = new Utils(i18n);
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),

  data: {
    isLoaded: false,
  },

  methods: {
    loadConfig() {
      api.getServerConfig().then((data) => {
        api.getLang(data.lang).then((lang) => {
          i18n.locale = data.lang;
          i18n.setLocaleMessage(i18n.locale, lang);
          this.isLoaded = true;
        });
      });
    },
  },

  created() {
    this.loadConfig();
    api.getSettings();
  },
}).$mount('#app');
