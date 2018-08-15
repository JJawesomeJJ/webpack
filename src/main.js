
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mintui from 'mint-ui'
import VueResource from 'vue-resource'
import VueJsonp from 'vue-jsonp'
import '../node_modules/mint-ui/lib/style.min.css'
import '../static/font-icon/iconfont.css'
import '../static/css/static.css'
import '../static/js/j-js'
import '../src/js/login'
Vue.use(mintui);
Vue.use(VueJsonp);
Vue.use(VueResource);
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
