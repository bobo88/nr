<template>
  <div class="wrapper">
    <top></top>
    <left></left>
    <div class="content">
      <div class="col-xs-12 col-sm-12 col-md-12 main-cont-target" id="js-mainContTarget">
        <div class="main-cont-wrapper" id="js-mainContWrapper">
          <!-- Child Comp -->
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </div>
        <footer class="main-footer" id="js-footBox">
          <div class="fr hidden-xs">
            <b>Version</b> 1.1.0

          </div>
          <strong>Copyright © 2018.</strong> All rights reserved.

        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/fonts/iconfont.css'    // 使用 iconfont图标库
  import Left from '../components/common/Left.vue'
  import Top from '../components/common/Top.vue'

  export default {
    components: {
      Left,
      Top
    },
    name: 'Mainer',
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        // 主体框架布局样式 js处理
        window.$GLOBAL.layoutMain();

        let loginData = {};
        loginData.UserName = vm.$cookie.get('akey');
        vm.$store.commit(vm.Constant.SET_LOGIN_DATA, loginData);
      })
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
  .content {
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 200px;
    right: 0;
    top: 60px;
    bottom: 0;
    width: auto;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .hide-left-aside .content {
    top: 120px;
  }

  .main-footer {
    background: #fff;
    padding: 15px;
    line-height: 20px;
    color: #444;
    border-top: 1px solid #d2d6de;
  }
</style>
