<template>
  <div class="add-scene">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加适用场景</el-button>
    </div>
    <el-table
      :data="sortListData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="适合场景名称"
        align="center">
      </el-table-column>

      <el-table-column
        prop="weight"
        label="权重"
        align="center">
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
      width="50%"
      center>
      <div class="tc-main tc">
        <div class="mb10">
          <span class="inline-block w100">适用场景：</span>
          <el-input size="small" class="w200" v-model="tcObj.sortName"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">权重：</span>
          <el-input size="small" class="w200" v-model="tcObj.weight"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'add-scene',
    data () {
      return {
        sortListData: [],
        tnameList: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载适用场景数据
      this.getSortList();
    },
    methods: {
      getSortList () {
        let options = {
          action: 'find'
        };
        this.Api.scene(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.sortListData = _data;
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      addOprate () {
        this.tcObj = Object.assign({}, {
          tit: '添加适用场景'
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑适用场景',
          id: item.id,
          sortName: item.name,
          weight: item.weight
        });
        this.$nextTick(() => {
          this.centerDialogVisible = true;
        });
      },
      // 点击确定
      submitOK () {
        if (!this.tcObj.sortName) {
          this.$message.error('请填入分类名称');
          return;
        }
        let options = {
          action: 'add',
          name: this.tcObj.sortName,
          weight: this.tcObj.weight
        };
        // 编辑状态
        if (this.tcObj.id) {
          options = Object.assign({}, options, {
            action: 'update',
            id: this.tcObj.id
          });
        }
        this.Api.scene(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            this.centerDialogVisible = false;
            this.getSortList();
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
