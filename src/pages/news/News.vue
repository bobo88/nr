<template>
  <div class="news">
    <h1 class="common-tit">新闻列表</h1>
    
    <news-list></news-list>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新闻banner" name="first">新闻banner</el-tab-pane>
      <el-tab-pane label="新闻列表" name="second">新闻列表</el-tab-pane>
      <el-tab-pane label="新闻列表Tab" name="third">新闻列表Tab</el-tab-pane>
      <el-tab-pane label="热门推荐" name="four  ">热门推荐</el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
  // 新闻列表 - 新闻列表
  import NewsList from '@/pages/news/child/NewsList.vue'
  export default {
    name: 'news',
    components: {
      NewsList
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
