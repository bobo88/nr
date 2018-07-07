import constant from '../../constant'

/**
 * 路由模块
 */
const moduleRouter = {
  state: {
    isLoginPage: false
  },
  getters: {
    [constant.GET_IS_LOGIN_PAGE]: state => {
      return state.isLoginPage
    }
  },
  mutations: {
    [constant.SET_IS_LOGIN_PAGE] (state, isLoginPage) {
      state.isLoginPage = isLoginPage
    }
  }
}

export default moduleRouter
