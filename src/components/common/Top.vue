<!--
内容：公共头部
作者：BOBO
日期： 20180130
-->
<template>
  <div class="top clearfix" id="js-topBox">
    <div class="col-xs-12 col-sm-12 col-md-2 logo"><img :src="logoSrc" width="194" height="44" alt="湖南南荣"></div>
    <div class="col-xs-2 col-sm-2 col-md-2 text-left">
      <i class="iconfont icon-fenlei top-oprate" id="js-toggleAside" @click="toggleAside"></i>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-8 tr user-name">
      <template v-if="userName">
        Welcome, {{ userName }}！
        <el-button size="medium" type="primary" @click="signOut">Sign out</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      title: this.Config.TITLE,
      userName: '',
      logoSrc: './static/logo.png'
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.userName = this.$cookie.get('akey');
    });
  },
  methods: {
    // 退出登录
    signOut () {
      // 退出登录后，删除cookie，跳转到登录页面
      this.$store.commit(this.Constant.DELETE_LOGIN_DATA)

      this.$router.push({name: 'login'});
      // let loginOptions = {
      //   reqHead: {
      //     clientType: '',
      //     sign: ''
      //   },
      //   reqBody: {
      //     userName: this.userName
      //   }
      // }

      // this.Api.getLoginOutData(loginOptions).then((res) => {
      //   return this.Api.checkResponse(res)
      // }).then(data => {
      //   if (data.code === 0 && data.codeDesc === 'success') {
      //     // 退出登录后，删除cookie，跳转到登录页面
      //     this.$store.commit(this.Constant.DELETE_LOGIN_DATA)

      //     this.$router.push({name: 'login'})
      //   } else {
      //     this.MyDebugger.log(data.codeDesc)
      //   }
      // }).catch(error => {
      //   // loadingInstance.close()
      //   this.Api.handleError(error)
      // })
    },
    toggleAside () {
      window.$GLOBAL.toggleAside();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
  .top {
    width: 100%;
    z-index: 5;
    line-height: 60px;
    color: $colorF;
    font-size: 18px;
    font-weight: 300;
    background: $mainColor;
    .logo{
      padding: 6px 0;
      height: 60px;
      line-height: 50px;
      text-align: center;    
      background: $mainColor;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      img {
        vertical-align: top;
      }
    }
    .text-left{
      text-align: left;    
      background: $mainColor;
    }
    .top-oprate {
      padding: 10px;
      font-size: 20px;
      font-weight: 300;
      cursor: pointer;
    }
    .user-name {
      font-size: 14px;
      background: $mainColor;
    }
  }
  .currentLang {
    font-weight: bold;
  }
</style>
