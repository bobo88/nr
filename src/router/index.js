import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index'
import constant from '../constant/index'
import cookie from '@/core/cookie'
import myDebugger from '@/debugger'
Vue.use(VueRouter)

let isHistory = process.env.NODE_ENV !== 'production'
isHistory = true
// 主页面
import Mainer from '../pages/Mainer'
// 模块化打包

// 首页 ----------------------------------------------------------------------
import Index from '../pages/index/Index.vue'

// 产品详情页面 ----------------------------------------------------------------------
import ProductDetails from '../pages/productDetails/ProductDetails.vue'

// 案例详情页面 ----------------------------------------------------------------------
import CaseDetails from '../pages/caseDetails/CaseDetails.vue'

// 新闻页面 ----------------------------------------------------------------------
import News from '../pages/news/News.vue'

// 联系我们 ----------------------------------------------------------------------
import ContactUs from '../pages/contactUs/ContactUs.vue'

// 关于我们 ----------------------------------------------------------------------
import AboutUs from '../pages/aboutUs/AboutUs.vue'

// ================================================================================
// 基础模块
/**
 * other 模块：（包含登录和404页）
 * @param r
 * @constructor
 */
const NotFound = r => require.ensure([], () => r(require('@/pages/NotFound.vue')), 'other')
const Login = r => require.ensure([], () => r(require('@/pages/Login.vue')), 'other')

/**
 * 页面组件与路由地址的对应关系
 * @type {*[]}
 */
const routes = [
  {
    path: '/main',
    name: 'Mainer',
    component: Mainer,
    redirect: '/index',
    children: [
      // 首页
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      // 产品列表
      {
        path: '/product-details',
        name: 'ProductDetails',
        component: ProductDetails
      },
      // 案例列表
      {
        path: '/case-details',
        name: 'CaseDetails',
        component: CaseDetails
      },
      // 新闻列表
      {
        path: '/news',
        name: 'News',
        component: News
      },
      // 联系我们
      {
        path: '/contact-us',
        name: 'ContactUs',
        component: ContactUs
      },
      // 关于我们
      {
        path: '/about-us',
        name: 'AboutUs',
        component: AboutUs
      }
    ]
  },
  {
    path: '/',
    component: Login,
    meta: {
      isLoginPage: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isLoginPage: true
    }
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound,
    meta: {
      isNotFoundPage: false
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  // linkActiveClass: 'page-active',
  history: isHistory,
  base: __dirname,
  routes: routes,
  srcollBehavior: function (to, from, savedPosition) {
    myDebugger.log('router scrollBehavior callback');
  }
})
/**
 * 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于 等待中。
 *  to: Route: 即将要进入的目标 路由对象
 *  from: Route: 当前导航正要离开的路由
 *  next: Function: 一定要调用该方法来 resolve 这个钩子。
 */
router.beforeEach((to, from, next) => {
  myDebugger.log('VueRouter\'s hook: beforeEach ====================');
  myDebugger.log('当前路由：', from);
  myDebugger.log('前往路由：', to);
  window.hideAside();
  // window.document.title = 'YoAds Admin';
  if (cookie.get('akey') && cookie.get('akey').length > 0) {
    let loginData = {};
    loginData.UserName = cookie.get('akey');
    Store.commit(constant.SET_LOGIN_DATA, loginData);
  }
  // 当前页面是否需要认证
  // let { auth = false } = to.meta;
  // 是否完成过认证
  var isLogin = Store.getters[constant.GET_IS_LOGIN] || false;
  let isLoginPage = to.meta.isLoginPage || false;
  // let isNotFoundPage = to.meta.isNotFoundPage || false;
  // window.console.log('auth:' + auth);
  // window.console.log('isLogin:' + isLogin);
  // window.console.log('isLoginPage:' + isLoginPage);
  // window.console.log('isNotFoundPage:' + isNotFoundPage);
  // window.console.log('------------------------------------------------------------');
  Store.commit(constant.SET_IS_LOGIN_PAGE, isLoginPage);
  // Store.commit(constant.SET_IS_NOT_FOUND_PAGE, isNotFoundPage);
  // 如果即将进入的页面需要认证，且当前没有认证，且当前页面不是登录页面，则跳转到登录页面
  if (!isLogin && !isLoginPage) {
    window.console.log('go to login page(reason: no login、need auth、no login page');
    return next({ path: '/login' });
  }
  next();
})

router.afterEach(route => {
  myDebugger.log('VueRouter\'s hook: afterEach  ====================');
  myDebugger.log('新的路由:', route);
})

export default router;
