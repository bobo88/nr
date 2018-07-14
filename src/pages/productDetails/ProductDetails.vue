<template>
  <div class="product-details">
    <h1 class="common-tit">产品列表</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="产品列表" name="first">
        <product-list></product-list>
      </el-tab-pane>
      <el-tab-pane label="管理所属分类" name="second">
        <add-sort></add-sort>
      </el-tab-pane>
      <el-tab-pane label="管理适用场景" name="three">
        <add-scene></add-scene>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ProductList from '@/pages/productDetails/child/ProductList.vue'
  import AddSort from '@/pages/productDetails/child/AddSort.vue'
  import AddScene from '@/pages/productDetails/child/AddScene.vue'
  export default {
    name: 'product-details',
    components: {
      ProductList,
      AddSort,
      AddScene
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
