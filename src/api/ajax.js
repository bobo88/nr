/**
 *  网络请求底层封装：用于定制axios库
 */

import * as axios from 'axios'
import config from '../config'
import qs from 'qs'

/**
 * 取消请求控制器：在axios的实例化中完成初始化
 * @type {null}
 */
window.axiosCancelControl = null
axios.defaults.baseURL = config.API_BASE_URL
/**
 * axios实例：用于定制请求
 */
let instance = axios.create({
  method: 'post', // 默认请求方法
  baseURL: config.API_BASE_URL,
  timeout: config.API_NORMAL_TIMEOUT,
  contentType: 'application/json;charset=UTF-8',
  responseType: 'json',

  onUploadProgress: function (progressEvent) {
    window.console.log('axios on upload progress ==========')
  },
  /**
   * 指定取消Token，能够用来取消请求
   */
  cancelToken: new axios.CancelToken(function (cancel) {
    window.axiosCancelControl = cancel
  })
})
/**
 * get请求
 *
 */
instance.getData = (url) => {
  return axios.get(url)
}
/**
 * 将取消请求控制器关联到axios实例中
 * @type {null}
 */
// instance.cancel = function (message) {
//   if (window.axiosCancelControl) {
//     window.axiosCancelControl(message)
//   }
// }

/**
 * 请求发送之前的钩子：进行额外参数的封装
 *    应用相关信息：
 *        请求类型： ReqType: ''
 *        应用标识: AppKey： ''
 *    用户登录信息：User:{Id: '', Token: ''}
 */
instance.interceptors.request.use(reqConfig => {
  // window.console.log('请求拦截器开始：==========')
  // window.console.log(reqConfig)

  // console.log('before convert', reqConfig.data)
  if (reqConfig.method === "post") {
    // 序列化
    reqConfig.data = qs.stringify(reqConfig.data); // ***** 这里转义
  }
  // console.log('after convert', reqConfig.data)
  return reqConfig
}, error => {
  // window.console.log('请求拦截器(error)：==========')
  return Promise.reject(error)
})

/**
 * 请求处理之前的钩子：进行响应结果的处理
 */
instance.interceptors.response.use(response => {
  // window.console.log('响应拦截器(normal)：==========')
  window.response = response
  // 取出服务器返回的数据
  let data = response.data
  return data
}, error => {
  // window.console.log('响应拦截器(error)：==========')
  // 抛出错误
  return Promise.reject(error)
})

/**
 * 检查api响应是否正确
 * @param res
 * @returns {*}
 */
instance.checkResponse = function (res) {
  let resultCode = res.code || '0';
  window.console.log()
  if (resultCode === '0') {
    return Promise.resolve(res)
  } else {
    var error = new Error()
    error.code = resultCode
    error.resultMessage = res.codeDesc
    return Promise.reject(error)
  }
}

/**
 * 请求错误处理
 * @param error
 */
instance.handleError = function (error) {
  window.console.log('错误处理，当前结果码：' + error)
  // let errorMsg = JSON.stringify(error)
  let resultCode = error.code || '0'
  if (resultCode === 400) {
    // 网络错误
    window.$message.error('网络错误！！！');
  } else {
    if (resultCode !== '0') {
      window.$message.error(error.resultMessage);
    } else {
      // 提示错误信息
      window.$message.error('请求失败，请刷新页面重试！');
    }
  }
}

export default instance
