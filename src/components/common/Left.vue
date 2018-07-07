<!--
内容：公共左侧栏
作者：BOBO
日期： 20180130
-->
<template>
<el-row class="left left-aside" id="js-leftAside">
  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
    <el-menu :unique-opened="true" :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" :router='true' background-color="#2e324b" text-color="#fff">
      <div v-for="(data, index) in linkData" :to="data.url" :key="index" class="mt5">
        <el-submenu v-if="data.sortChild" :index="data.url">
          <template slot="title">
            <!-- <span class="iconfont" :class="data.icon"></span> -->
            <span>{{ data.sort }}</span>
          </template>

          <el-menu-item-group>
            <el-menu-item v-for="(item, key, index) in data.sortChild" :key="index" :index="item.url">{{ item.tit }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item v-else :index="data.url">
          <!-- <span class="iconfont" :class="data.icon"></span> -->
          <span slot="title">{{ data.sort }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </el-col> 
</el-row>
</template>

<script>
export default {
  name: 'left',
  data () {
    return {
      linkData: [
        {
          sort: '首页',
          url: '/index',
          icon: 'icon-zhanghaoguanli'
        },
        // {
        //   sort: '产品中心页面',
        //   url: '/product-center',
        //   icon: 'icon-guanggaoguanli'
        // },
        {
          sort: '产品列表',
          url: '/product-details',
          icon: 'icon-baobiaoguanli'
        },
        // {
        //   sort: '销售案例页面',
        //   url: '/sales-case',
        //   icon: 'icon-baogaochaxun'
        // },
        {
          sort: '案例列表',
          url: '/case-details',
          icon: 'icon-baogaochaxun'
        },
        {
          sort: '新闻列表',
          url: '/news',
          icon: 'icon-baogaochaxun'
        },
        // {
        //   sort: '新闻详情页面',
        //   url: '/news-details',
        //   icon: 'icon-baogaochaxun'
        // },
        {
          sort: '联系我们',
          url: '/contact-us',
          icon: 'icon-baogaochaxun'
        }
        // {
        //   sort: '关于我们',
        //   url: '/about-us',
        //   icon: 'icon-baogaochaxun'
        // }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log('handleOpen+++++++++', key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log('handleClose+++++++++', key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log('handleSelect+++++++++', key)
      this.activeUrl = key
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
.left-aside {
  position: absolute;
  z-index: 3;
  left: 0;
  top: 60px;
  bottom: 0;
  padding: 0;
  background: $subColor;
  overflow: auto;
  .iconfont {
    margin-right: 5px;
  }
}
.el-menu-item {
  &.is-active {
    color: $mainFontColor;
    background-color: rgb(48, 60, 75) !important;
  }
}

.el-submenu {
  .el-menu-item {
    margin-bottom: 2px;
  }
}
</style>
