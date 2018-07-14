import ajax from './ajax'

export default {
  ajax: ajax,
  // ================================================================================
  // 辅助方法
  /**
   * 检查api响应是否正确
   * @param res
   * @returns {*}
   */
  checkResponse: function (res) {
    return ajax.checkResponse(res || {})
  },

  /**
   * 是否为服务器api请求返回的结果码
   * @param resultCode
   * @returns {boolean}
   */
  isServerResultCode: function (resultCode) {
    resultCode = parseInt(resultCode || 0)
    return resultCode === 0
  },

  /**
   * 请求错误处理(如果为服务器返回的则使用统一的处理，其余错误请自己处理)
   * @param error
   * @param handleFunc)
   */
  handleError: function (error, handleFunc) {
    if ((!handleFunc || typeof handleFunc !== 'function') || (error && this.isServerResultCode(error.code))) {
      return ajax.handleError(error)
    } else {
      handleFunc(error)
    }
  },

  /**
   * 后台管理登录
   * @param {}
   */
  getLoginData (options) {
    return ajax.post('game/user/login', {
      reqHead: options.reqHead,
      reqBody: options.reqBody
    })
  },
  /**
   * 后台管理退出登录
   * @param {}
   */
  getLoginOutData (options) {
    return ajax.post('game/user/logOut', {
      reqHead: options.reqHead,
      reqBody: options.reqBody
    })
  },

  // --------------------------------------- 公用接口 ------------------------------------------------------
  // return ajax.getData('http://ads.vaspay.com/api/offer')
  /**
   * 商品列表
   */
  goods (options) {
    return ajax.post('goods.php', options)
  },
  // 商品类型
  goodstype (options) {
    return ajax.post('goodstype.php', options)
  },
  // 销售案例
  sale (options) {
    return ajax.post('sale.php', options)
  },
  // 销售l案例类型接口
  saletype (options) {
    return ajax.post('saletype.php', options)
  },
  // 新闻接口
  news (options) {
    return ajax.post('news.php', options)
  },
  // 留言接口
  message (options) {
    return ajax.post('message.php', options)
  },
  // 各类图片管理
  saveimg (options) {
    return ajax.post('saveimg.php', options)
  },
  // 底部名称
  footer (options) {
    return ajax.post('footer.php', options)
  },
  // 使用场景
  scene (options) {
    return ajax.post('scene.php', options)
  }
}
