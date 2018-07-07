<template>
  <div class="index-page">
    <h1 class="common-tit">首页配置</h1>

    <!-- // // 首页 - 配置logo
    // import LogoConfig from '../pages/index/child/LogoConfig.vue'
    // // 首页 - 导航条
    // import NavConfig from '../pages/index/child/NavConfig.vue'
    // // 首页 - 首页轮播图
    // import BannerConfig from '../pages/index/child/BannerConfig.vue'
    // // 首页 - 热销车型
    // import HotSale from '../pages/index/child/HotSale.vue'
    // // 首页 - 合作客户
    // import CustomersConfig from '../pages/index/child/CustomersConfig.vue'
    // // 首页 - 新闻资讯
    // import NewsConfig from '../pages/index/child/NewsConfig.vue'
    // // 首页 - 页面底部
    // import FootConfig from '../pages/index/child/FootConfig.vue' -->


    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="配置logo" name="first">
        <logo-config></logo-config>
      </el-tab-pane>
      <!-- <el-tab-pane label="导航条" name="second">
        <nav-config></nav-config>
      </el-tab-pane> -->
      <el-tab-pane label="首页轮播图" name="third">
        <banner-config></banner-config>
      </el-tab-pane>
      <el-tab-pane label="热销车型" name="fourth">
        <hot-sale></hot-sale>
      </el-tab-pane>
      <el-tab-pane label="合作客户" name="five">
        <customers-config></customers-config>
      </el-tab-pane>
      <!-- <el-tab-pane label="新闻资讯" name="six">
        <news-config></news-config>
      </el-tab-pane> -->
      <el-tab-pane label="页面底部" name="seven">
        <foot-config></foot-config>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 首页 - 配置logo
import LogoConfig from '@/pages/index/child/LogoConfig.vue'
// 首页 - 导航条
import NavConfig from '@/pages/index/child/NavConfig.vue'
// 首页 - 首页轮播图
import BannerConfig from '@/pages/index/child/BannerConfig.vue'
// 首页 - 热销车型
import HotSale from '@/pages/index/child/HotSale.vue'
// 首页 - 合作客户
import CustomersConfig from '@/pages/index/child/CustomersConfig.vue'
// 首页 - 新闻资讯
import NewsConfig from '@/pages/index/child/NewsConfig.vue'
// 首页 - 页面底部
import FootConfig from '@/pages/index/child/FootConfig.vue'
export default {
  name: 'index-page',
  components: {
    LogoConfig,
    NavConfig,
    BannerConfig,
    HotSale,
    CustomersConfig,
    NewsConfig,
    FootConfig
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
