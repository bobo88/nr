// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './prototype'
import myDebugger from './debugger'
import $ from 'jquery'
import Vue from 'vue'
import 'babel-polyfill'

import axios from './api/ajax'
import router from './router'
import store from './store'
import api from './api'

import config from './config'
import constant from './constant'

import cookie from './core/cookie'
import GLOBAL from './core/global'
import uploadImageOption from './core/upload-image'
// element-ui组件样式
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { locale });
import * as filters from './filters'
Vue.config.productionTip = false;

import App from './App'

// 注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
window.$ = $;
window.$messageBox = ElementUI.MessageBox;
window.$loading = ElementUI.Loading;
window.$alert = ElementUI.MessageBox.alert;
window.$confirm = ElementUI.MessageBox.confirm;
window.$prompt = ElementUI.MessageBox.prompt;
window.$notify = ElementUI.Notification;
window.$message = ElementUI.Message;
window.$GLOBAL = GLOBAL;
window.hideAside = function () {
  let winW = $(window).width();
  let $appElement = $('#app');
  // 如果不是中等屏幕以上（桌面显示器）
  if (winW < 992) {
    $appElement.addClass('hide-left-aside');
  }
}

// 添加Vue的原型链(只读)
Object.defineProperty(Vue.prototype, '$axios', { value: axios });
Object.defineProperty(Vue.prototype, 'Config', { value: config });
Object.defineProperty(Vue.prototype, 'Constant', { value: constant });
Object.defineProperty(Vue.prototype, 'MyDebugger', { value: myDebugger });
Object.defineProperty(Vue.prototype, '$cookie', { value: cookie });
Object.defineProperty(Vue.prototype, '$uploadImage', { value: uploadImageOption });
Object.defineProperty(Vue.prototype, 'Api', { value: api });
Object.defineProperty(Vue.prototype, '$filters', { value: filters });
/**
 * 可修改
 */
/* Vue.prototype.$config = config */
Vue.prototype.$store = store;
// element-ui组件
Vue.prototype.$loading = ElementUI.Loading;
Vue.prototype.$MessageBox = ElementUI.MessageBox;
Vue.prototype.$alert = ElementUI.MessageBox.alert;
Vue.prototype.$confirm = ElementUI.MessageBox.confirm;
Vue.prototype.$prompt = ElementUI.MessageBox.prompt;
Vue.prototype.$notify = ElementUI.Notification;
Vue.prototype.$message = ElementUI.Message;
/* eslint-disable */
// 注册全局异常捕获器
Vue.config.errorHandler = function (err, vm, info) {
  myDebugger.log(arguments);
}

/* eslint-disable no-new */
new Vue({
  el: document.getElementById('app'),
  router,
  store,
  template: '<App/>',
  components: { App }
})
