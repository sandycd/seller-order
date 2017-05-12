import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import './common/stylus/index.styl';
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
});
