<template>
  <div class="sales-case">
    <h1 class="common-tit">销售案例页面</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="案例分类" name="first">案例分类</el-tab-pane>
      <el-tab-pane label="最新案例排序" name="second">最新案例排序</el-tab-pane>
      <el-tab-pane label="案例列表" name="third">案例列表</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'sales-case',
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
