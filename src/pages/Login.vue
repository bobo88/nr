<!--
内容：登录 组件
作者：BOBO
日期： 20180130
-->
<template>
  <div class="login-component pop-ups clearfix">
    <transition name="fade">
      <div class="col-xs-8 col-sm-6 col-md-3 pop-ups-cont">
        <header class="state-icon">
          <i class="logo"></i>
        </header>

        <main class="main-wrap" style="margin:0 auto; width:80%;">
          <p class="item-form">
            <el-input type="input" size="medium" v-model.trim="account" placeholder="Account" @keyup.enter.native="login" :maxlength="20"></el-input>
          </p>
          <p class="item-form">
            <el-input type="password" size="medium" v-model.trim="password" placeholder="Password" @keyup.enter.native="login" :maxlength="20"></el-input>
          </p>
        </main>

        <footer class="footer-wrap">
          <div class="clearfix">
            <el-button size="medium" type="primary" style="width: 80%;" @click="login">Login</el-button>
          </div>

          <p class="error-msg">{{ msgCont }}</p>
        </footer>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      isLoging: false,
      account: '',
      password: '',
      msgCont: '',
      title: this.Config.TITLE
    }
  },
  computed: {},
  mounted () {
    this.showLogin = true
  },
  methods: {
    login () {
      let vm = this;
      // let loginOptions = {
      //   reqHead: {
      //     clientType: '',
      //     sign: ''
      //   },
      //   reqBody: {
      //     userName: this.account,
      //     password: this.password
      //   }
      // };
      if (!vm.account) {
        vm.msgCont = 'Username can not be empty'
        return
      }
      if (!vm.password) {
        vm.msgCont = 'Password can not be empty'
        return
      }

      if (vm.account === 'admin' && vm.password === 'admin') {
        // 登录成功后，设置cookie
        let loginData = {}
        loginData.UserName = vm.account
        this.$store.commit(this.Constant.SET_LOGIN_DATA, loginData)
        this.$router.push({ name: 'Mainer' })
      } else {
        window.$message.error('Wrong user name or password');
      }

      // this.Api.getLoginData(loginOptions)
      //   .then(res => {
      //     return this.Api.checkResponse(res)
      //   })
      //   .then(data => {
      //     if (data.code === 0 && data.codeDesc === 'success') {
      //       // 登录成功后，设置cookie
      //       let loginData = {}
      //       loginData.UserName = data.data
      //       this.$store.commit(this.Constant.SET_LOGIN_DATA, loginData)
      //       this.$router.push({ name: 'Mainer' })
      //     } else {
      //       this.MyDebugger.log(data.codeDesc)
      //       this.msgCont = data.codeDesc
      //     }
      //   })
      //   .catch(error => {
      //     // loadingInstance.close()
      //     this.Api.handleError(error)
      //   })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
.pop-ups {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  color: $colorF;
  background: url('../assets/img/bg.jpg') center center no-repeat;
}

.pop-ups-cont {
  position: absolute;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height:  300px;
  color: #000;
  background: $bgF;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;

  .state-icon {
    padding: 20px 0;
  }

  .iconfont {
    font-size: 36px;
  }

  .logo {
    display: inline-block;
    width: 200px;
    height: 50px;
    background: url('../assets/img/logo.png') center center no-repeat;
    background-size: 200px auto;
  }

  .main-wrap {
    .title {
      margin: 0 0 10px;
      padding: 0;
      line-height: 30px;
      color: $color3;
      font-size: 20px;
    }
    .item-form {
      margin: 0 0 10px 0;
    }

    .tips {
      line-height: 20px;
      color: $color9;
      font-size: 14px;
    }
  }
  .error-msg {
    padding-top: 5px;
    line-height: 20px;
    color: $colorRed;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
