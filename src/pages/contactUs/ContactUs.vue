<template>
  <div class="contact-us">
    <h1 class="common-tit">联系我们</h1>

    <message></message>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="在线留言" name="first">
        <message></message>
      </el-tab-pane>
      <el-tab-pane label="联系我们" name="second">
        <find-us></find-us>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
  // 联系我们
  import Message from '@/pages/contactUs/child/Message.vue'
  import FindUs from '@/pages/contactUs/child/FindUs.vue'
  export default {
    name: 'contact-us',
    components: {
      Message,
      FindUs
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
