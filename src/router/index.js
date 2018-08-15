import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//webpack按需加载组件
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), ' home');
const login = l =>
    require.ensure([], () => l(require('../page/home/login')), ' login');
const register = k =>
    require.ensure([], () => k(require('../page/home/register')), 'register');
const news_list = j =>
    require.ensure([], () => j(require('../page/news/news_list')), 'news_list');
const news_content = w =>
    require.ensure([], () => w(require('../page/news/news_content')), 'new_content');
export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
      {
          path: '/login',
          name: 'login',
          component: login
      },
      {
          path: '/register',
          name: 'register',
          component: register
      },
      {
          path: '/news_list',
          name: 'news_list',
          component:news_list
      },
      {
          path: '/news_content',
          name: 'news_content',
          component:news_content
      }

  ]
});