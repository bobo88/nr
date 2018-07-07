<template>
  <div class="about-us">
    <h1 class="common-tit">关于我们</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全屏图" name="first">全屏图</el-tab-pane>
      <el-tab-pane label="公司简介" name="second">公司简介</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'about-us',
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
