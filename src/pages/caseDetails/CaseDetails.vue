<template>
  <div class="case-details">
    <h1 class="common-tit">案例列表</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="销售案例列表" name="first">
        <case-list></case-list>
      </el-tab-pane>
      <el-tab-pane label="销售案例类型" name="second">
        <add-case-type></add-case-type>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // 案例列表 - 案例列表
  import CaseList from '@/pages/caseDetails/child/CaseList.vue'
  import AddCaseType from '@/pages/caseDetails/child/AddCaseType.vue'
  export default {
    name: 'case-details',
    components: {
      CaseList,
      AddCaseType
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
