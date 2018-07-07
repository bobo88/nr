<template>
  <div class="news-details">
    <h1 class="common-tit">新闻详情页面</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="案例配置项目" name="first">案例配置项目</el-tab-pane>
      <el-tab-pane label="相关案例&热门案例" name="second">相关案例&热门案例</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'news-details',
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
