<template>
  <div class="offers-list">
    <h1 class="common-tit">Offers List</h1>

    <div class="clearfix mb10">
      <span>Country：</span>
      <el-select size="small" id="country" disabled="true" class="w150 mr15 mb10" v-model="country" placeholder="Please select">
        <el-option key="-1" label="Nigeria" value="-1"></el-option>
      </el-select>

      <span>ChannelID：</span>
      <el-select size="small" disabled="true" id="channelID" class="w150 mr15 mb10" v-model="channelID" placeholder="Please select">
        <el-option key="-1" label="All" value="-1"></el-option>
        <el-option v-for="(item, index) in OffersList" :key="index" :label="item.adId" :value="item.adId"></el-option>
      </el-select>

      <span>Time：</span>
      <el-date-picker
        disabled="true"
        size="small"
        class="mr15 mb10"
        v-model="generationTime"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="To"
        start-placeholder="Start Time"
        end-placeholder="End Time">
      </el-date-picker>

      <el-button size="small" @click="search" type="info" class="mr30">Search</el-button>

      <p class="fr pr30 lh34"><span class="f16 fb mr10">Total:</span> <span class="f14 linkColor fb">${{ total }}</span></p>
    </div>

    <div class="list-cont mb10">
      <el-table ref="multipleTable" border :data="OffersList" tooltip-effect="dark" style="width:100%;">
        <el-table-column align="center" label="No." type="index"></el-table-column>
        <el-table-column align="center" label="Date" prop="dateStr"></el-table-column>
        <el-table-column align="center" label="Ad ID" prop="adId"></el-table-column>
        <el-table-column align="center" label="Impressions">
          <template slot-scope="scope">
            <span>{{ scope.row.impressions | numberFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Clicks" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.clickCount | numberFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Impressions CTR">
          <template slot-scope="scope">
            <span>{{ scope.row.impressionsPercent }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="CPC">
          <template slot-scope="scope">
            <span>${{ scope.row.payout }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Revenue">
          <template slot-scope="scope">
            <span>${{ scope.row.revenueVal }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'offers-list',
    data () {
      return {
        country: '-1',
        channelID: '-1',

        OffersList: [],
        total: ''
      }
    },
    created () {
      this.$nextTick(() => {
        this.getOffersList();
      });
    },
    filters: {
      numberFormat (val) {
        var b = parseInt(val).toString();
        var len = b.length;
        if (len <= 3) { return b; }
        var r = len % 3;
        return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
      }
    },
    methods: {
      search () {
        this.getOffersList();
      },

      getOffersList () {
        this.Api.getOffersList()
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          let _list = data.data.itemList;
          this.OffersList = _list;
          this.total = data.data.total;

          for (let i = 0; i < _list.length; i++) {
            _list[i].impressionsPercent = ((_list[i].clickCount / _list[i].impressions) * 100).toFixed(2) + '%';
            _list[i].revenueVal = (_list[i].payout * _list[i].clickCount).toFixed(2);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      handleSizeChange (val) {
        this.pageSize = val;
        this.getOffersList();
      },
      handleCurrentChange (val) {
        this.pageNum = val;
        this.getOffersList();
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
