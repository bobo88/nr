<!--
作者：BOBO
日期： 20180517
-->
<template>
  <div class="add-user clearfix f14">
    <el-dialog
      :title="tcObj.title"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <div class="add-user-content">
        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">User Type：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-radio v-model="tcObj.userType" label="1">Manager</el-radio>
            <el-radio v-model="tcObj.userType" label="2">Advisters</el-radio>
            <el-radio v-model="tcObj.userType" label="3">Publiser</el-radio>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">User Name：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="tcObj.userName" placeholder="Please enter user name"></el-input>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">Email：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="tcObj.email" placeholder="Please enter email"></el-input>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">Password：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="tcObj.password" placeholder="Please enter password"></el-input>
          </div>
        </div>

        <template v-if="tcObj.userType !== '1'">
          <div class="clearfix lh34 mb10">
            <div class="col-xs-12 col-sm-4 col-md-4 tr">Postback：</div>
            <div class="col-xs-12 col-sm-8 col-md-8">
              <el-input type="textarea" v-model.trim="tcObj.postback" disabled="true" :rows="4" class="w300 mb10" placeholder="Please click the add button to operate"></el-input>
              <el-button type="primary" size="small" @click="addOprate">Add Para-Configuration</el-button>
            </div>
          </div>

          <div class="clearfix lh34 mb10">
            <div class="col-xs-12 col-sm-4 col-md-4 tr">Postback Value：</div>
            <div class="col-xs-12 col-sm-8 col-md-8">
              200
            </div>
          </div>
        </template>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancleOprate">Cancel</el-button>
        <el-button size="small" @click="submitAdd" type="primary">Modify And Save</el-button>
      </span>
    </el-dialog>

    <!-- 添加/编辑 消息 弹窗 -->
    <para-config ref="paraConfig" @cb="paraConfigSucc" :user-type="tcObj.userType"></para-config>
  </div>
</template>

<script>
  import ParaConfig from '@/pages/accountManagement/child/ParaConfig';

  export default {
    name: 'add-user',
    components: {
      ParaConfig
    },
    props: ['tcObj'],
    data () {
      return {
        // 默认隐藏
        dialogVisible: false,
        defaultTcObj: {
          type: 0,
          title: 'Add User',
          userType: '',
          userName: '',
          email: '',
          password: '',
          postback: 'http://postback.palmstore.com/inf/adsync/?aff_id={affid}&click_id={clickid}&payout={payout}&af_siteid={af_siteid}'
        }
      }
    },
    mounted: function () {
      // xx
    },
    created () {
      this.$nextTick(() => {
        // xxx
      });
    },
    methods: {
      show () {
        this.$nextTick(() => {
          this.dialogVisible = true;
          // 获得数据默认设置
          this.tcObj = Object.assign({}, this.defaultTcObj, this.tcObj);
        });
      },
      submitAdd () {
        this.$message.success('Add Success!');
        this.dialogVisible = false;
        // 触发回调
        this.$emit('cb');
      },
      reset () {
        this.tcObj = Object.assign({}, this.defaultTcObj);
      },
      cancleOprate () {
        this.dialogVisible = false;
        // 重置表单
        this.reset()
      },
      addOprate () {
        // show Para Config TC
        this.$refs.paraConfig.show();
      },
      paraConfigSucc () {
        // xxx
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
  
</style>
