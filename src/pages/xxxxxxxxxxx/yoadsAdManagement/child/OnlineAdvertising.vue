<template>
  <div class="online-advertising">
    <h1 class="common-tit">Online Advertising</h1>

    <div class="clearfix mb10">
      <span>Campaign Name：</span>
      <el-select size="small" id="CampaignName" class="w150 mr15 mb10" v-model="CampaignName" placeholder="Please select">
        <el-option key="-1" label="All" value="-1"></el-option>
        <el-option v-for="(item, index) in CampaignNameList" :key="index" :label="item.tit" :value="item.val"></el-option>
      </el-select>

      <span>Country：</span>
      <el-input size="small" class="w150 mr15" v-model.trim="country" placeholder="Please select"></el-input>

      <span>Campaign Mode：</span>
      <el-select size="small" id="CampaignMode" class="w150 mr15 mb10" v-model="CampaignMode" placeholder="Please select">
        <el-option key="-1" label="All" value="-1"></el-option>
        <el-option v-for="(item, index) in CampaignModeList" :key="index" :label="item.tit" :value="item.val"></el-option>
      </el-select>

      <el-button size="small" @click="search" type="primary" plain>Search</el-button>
      <el-button type="primary" size="small" @click="addOprate">Add Campaign</el-button>
    </div>

    <div class="list-cont mb10">
      <el-table ref="multipleTable" border :data="OnlineAdList" tooltip-effect="dark" style="width:100%;">
        <el-table-column align="center" label="Campaign Name" width="150">
          <template slot-scope="scope">
            <p class="lh34 ellipsis w100Percent">{{ scope.row.adsName }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Campaign Mode" width="150">
          <template slot-scope="scope">
            <p class="lh34 ellipsis w100Percent">{{ scope.row.adsMode }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Campaign style" prop="adsStyle" width="150"></el-table-column>
        <el-table-column align="center" label="Frequency Capping" width="180">
          <template slot-scope="scope">
            <span>Frequency Capping</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Campaign Payout" width="180">
          <template slot-scope="scope">
            <span>Campaign Payout</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="C-Payout" width="100">
          <template slot-scope="scope">
            <span>C-Payout</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Start" prop="start"></el-table-column>
        <el-table-column align="center" label="End" prop="end"></el-table-column>
        <el-table-column align="center" label="Status" prop="status"></el-table-column>
        <el-table-column align="center" label="Country" prop="country"></el-table-column>
        <el-table-column align="center" label="Action" width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editOprate(scope.row)">Edit</el-button>
            <el-button type="warning" size="small" @click="stopOprate(scope.row)">Stop</el-button>
            <el-button type="danger" size="small" @click="deleteOprate(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="bo-pagination tr mb10">
      <el-pagination layout="total, sizes, prev, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNum" :page-sizes="[5, 10, 25, 50]" :page-size="pageSize" :total="total">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'online-advertising',
    data () {
      return {
        CampaignName: '-1',
        CampaignNameList: [
          {
            tit: 'YoWeather',
            val: '1'
          },
          {
            tit: '可口可乐',
            val: '2'
          },
          {
            tit: 'Vcloud',
            val: '3'
          }
        ],
        country: '',
        CampaignMode: '-1',
        CampaignModeList: [
          {
            tit: 'CPM',
            val: '1'
          },
          {
            tit: 'CPC',
            val: '2'
          },
          {
            tit: 'CPI',
            val: '3'
          }
        ],

        OnlineAdList: [],
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    },
    created () {
      this.$nextTick(() => {
        this.getOnlineAdList();
      });
    },
    methods: {
      search () {
        this.getOnlineAdList();
      },

      getOnlineAdList () {
        this.OnlineAdList = [
          {
            adsName: '可口可乐2222222222222222',
            adsMode: 'CPI',
            adsStyle: '网页',
            frequencyCapping: '1000次1天，共5天',
            campaignPayout: '',
            c_Payout: '',
            start: '',
            end: '',
            status: '',
            country: ''
          },
          {
            adsName: 'yoweather',
            adsMode: 'CPI',
            adsStyle: 'app',
            frequencyCapping: '',
            campaignPayout: '',
            c_Payout: '',
            start: '',
            end: '',
            status: '',
            country: ''
          }
        ];
      },
      handleSizeChange (val) {
        this.pageSize = val;
        this.getOnlineAdList();
      },
      handleCurrentChange (val) {
        this.pageNum = val;
        this.getOnlineAdList();
      },
      editOprate (item) {
        // xx
      },
      stopOprate (item) {
        // xx
      },
      deleteOprate (item) {
        // xx
      },
      // 添加成功应用内消息 回调函数
      addSucc () {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
