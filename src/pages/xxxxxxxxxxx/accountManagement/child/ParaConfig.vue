<!--
作者：BOBO
日期： 20180517
-->
<template>
  <div class="para-config clearfix f14">
    <el-dialog
      title="Para-Configuration"
      :visible.sync="dialogVisible"
      width="50%"
      center>
      <div class="para-config-content">
        <div class="clearfix lh34 mb10" v-if="userType === '2'">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">aff_id：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" disabled="true" class="w200 mr15" v-model.trim="aff_id" placeholder="Please enter aff_id"></el-input>
            <el-checkbox disabled="true" v-model="aff_idIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10" v-if="userType === '3'">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">adv_id：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" disabled="true" class="w200 mr15" v-model.trim="adv_id" placeholder="Please enter adv_id"></el-input>
            <el-checkbox disabled="true" v-model="adv_idIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">off_id：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="off_id" placeholder="Please enter off_id"></el-input>
            <el-checkbox v-model="off_idIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">af_siteid：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="af_siteid" placeholder="Please enter af_siteid"></el-input>
            <el-checkbox v-model="af_siteidIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">click_id：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="click_id" placeholder="Please enter click_id"></el-input>
            <el-checkbox v-model="click_idIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">payout：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="payout" placeholder="Please enter payout"></el-input>
            <el-checkbox v-model="payoutIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">country：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="country" placeholder="Please enter country"></el-input>
            <el-checkbox v-model="countryIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">carrier：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="carrier" placeholder="Please enter carrier"></el-input>
            <el-checkbox v-model="carrierIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">ip：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="ip" placeholder="Please enter ip"></el-input>
            <el-checkbox v-model="ipIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">conversion_time：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="conversion_time" placeholder="Please enter conversion_time"></el-input>
            <el-checkbox v-model="conversion_timeIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">OS：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="OS" placeholder="Please enter OS"></el-input>
            <el-checkbox v-model="OSIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">IMEI：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="IMEI" placeholder="Please enter IMEI"></el-input>
            <el-checkbox v-model="IMEIIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">AndroidID：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="AndroidID" placeholder="Please enter AndroidID"></el-input>
            <el-checkbox v-model="AndroidIDIsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">S1：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="S1" placeholder="Please enter S1"></el-input>
            <el-checkbox v-model="S1IsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">S2：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="S2" placeholder="Please enter S2"></el-input>
            <el-checkbox v-model="S2IsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">S3：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="S3" placeholder="Please enter S3"></el-input>
            <el-checkbox v-model="S3IsChecked"></el-checkbox>
          </div>
        </div>

        <div class="clearfix lh34 mb10">
          <div class="col-xs-12 col-sm-4 col-md-4 tr">S4：</div>
          <div class="col-xs-12 col-sm-8 col-md-8">
            <el-input size="small" class="w200 mr15" v-model.trim="S4" placeholder="Please enter S4"></el-input>
            <el-checkbox v-model="S4IsChecked"></el-checkbox>
          </div>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancleOprate">Cancel</el-button>
        <el-button size="small" @click="submitAdd" type="primary">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'para-config',
    props: ['userType'],
    data () {
      return {
        // 默认隐藏
        dialogVisible: false,
        aff_id: 'pub_xxxxxxxxxxxxxxxx',
        aff_idIsChecked: true,
        adv_id: 'adv_xxxxxxxxxxxxxxxx',
        adv_idIsChecked: true,
        off_id: '',
        off_idIsChecked: false,
        af_siteid: '',
        af_siteidIsChecked: false,
        click_id: '',
        click_idIsChecked: false,
        payout: '',
        payoutIsChecked: false,
        country: '',
        countryIsChecked: false,
        carrier: '',
        carrierIsChecked: false,
        ip: '',
        ipIsChecked: false,
        conversion_time: '',
        conversion_timeIsChecked: false,
        OS: '',
        OSIsChecked: false,
        IMEI: '',
        IMEIIsChecked: false,
        AndroidID: '',
        AndroidIDIsChecked: false,
        S1: '',
        S1IsChecked: false,
        S2: '',
        S2IsChecked: false,
        S3: '',
        S3IsChecked: false,
        S4: '',
        S4IsChecked: false
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
        });
      },
      submitAdd () {
        this.dialogVisible = false;
        // 触发回调
        this.$emit('cb');
      },
      reset () {
        // xxxx
      },
      cancleOprate () {
        this.dialogVisible = false;
        // 重置表单
        this.reset()
      },
      addOprate () {
        // xx
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">
  
</style>
