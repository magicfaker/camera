import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/index'
import App from './App'
import Http from './service/http'
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)
// import tabbar from './components/Tabbar'
import Uploader from 'vux-uploader'
Vue.use(Uploader)
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)



/**********************$t国际化报错设置 */
import Vuex from 'vuex';
import VueTouch from 'vue-touch';
import vuexI18n from 'vuex-i18n';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        i18n: vuexI18n.store
    },
});
Vue.use(vuexI18n.plugin, store);
const translationsEn = {
    "content": "This is some {type} content"
};
Vue.i18n.add('en', translationsEn);
Vue.i18n.set('en');
Vue.use(VueTouch, {
  name: 'v-touch'
});
/********************** */

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$Http = Http

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
