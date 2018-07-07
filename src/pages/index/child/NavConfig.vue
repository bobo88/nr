<template>
  <div class="nav-config">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加产品类别</el-button>
    </div>
    <el-table
      :data="navConfigData"
      border
      style="width: 100%">
      <el-table-column
        prop="category"
        label="产品类别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fitScene"
        label="适合场景"
        align="center">
      </el-table-column>
      <el-table-column
        prop="linkUrl"
        label="链接地址"
        align="center">
      </el-table-column>
      <el-table-column
        prop="position"
        align="center"
        label="位置">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editOprate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="tcObj.tit"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="tc-main">
        <div class="mb10">
          <span class="inline-block w80">产品类别：</span>
          <el-input size="small" class="w200" v-model="tcObj.category" placeholder="请输入产品类别"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w80">适合场景：</span>
          <el-input size="small" class="w200" v-model="tcObj.fitScene" placeholder="请输入适合场景"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w80">链接地址：</span>
          <el-input size="small" class="w200" v-model="tcObj.linkUrl" placeholder="请输入链接地址"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w80">位置：</span>
          <el-input size="small" class="w200" type="number" v-model="tcObj.position" placeholder="请输入位置"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'nav-config',
    data () {
      return {
        navConfigData: [
          {
            category: '观光车系列',
            fitScene: '公园',
            linkUrl: 'http://www.baidu.com',
            position: 1
          },
          {
            category: '老爷车系列',
            fitScene: '房地产',
            linkUrl: 'http://www.baidu.com',
            position: 2
          }
        ],
        category: '',
        fitScene: '',
        linkUrl: '',
        position: '',
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    methods: {
      addOprate () {
        this.tcObj = Object.assign({}, {
          tit: '添加产品类别'
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑产品类别',
          category: item.category,
          fitScene: item.fitScene,
          linkUrl: item.linkUrl,
          position: item.position
        });
        this.$nextTick(() => {
          this.centerDialogVisible = true;
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
