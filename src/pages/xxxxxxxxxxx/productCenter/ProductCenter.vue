<template>
  <div class="product-center">
    <h1 class="common-tit">产品中心页面</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="产品中心" name="first">
        <pro-center></pro-center>
      </el-tab-pane>
      <el-tab-pane label="分页" name="second">分页</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // 产品中心 - 产品中心
  import ProCenter from '@/pages/productCenter/child/ProductCenter.vue'
  export default {
    name: 'product-center',
    components: {
      ProCenter
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
