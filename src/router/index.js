import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/goods/goods';
import seller from '../components/seller/seller.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/goods', component: goods
  }, {
    path: '/seller', component: seller
  }, {path: '/ratings', component: require('../components/ratings/ratings.vue')
  }, {
    path: '*', redirect: '/goods'
  }],
  linkActiveClass: 'active'

});

export default router;
