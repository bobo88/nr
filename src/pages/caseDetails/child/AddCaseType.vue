<template>
  <div class="product-list">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加销售案例类型</el-button>
    </div>
    <el-table
      :data="caseTypeListData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="所属类型"
        align="center">
      </el-table-column>

      <el-table-column prop="weight" label="权重" align="center"></el-table-column>

      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editOprate(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteOprate(scope.row)">删除</el-button>
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
          <span class="inline-block w100">案例类型名称：</span>
          <el-input size="small" class="w200" v-model="tcObj.name"></el-input>
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
    name: 'product-list',
    data () {
      return {
        caseTypeListData: [],
        tnameList: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载所属分类数据
      this.getCaseTypeList();
    },
    methods: {
      getCaseTypeList () {
        let options = {
          action: 'find'
        };
        this.Api.saletype(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.caseTypeListData = _data;
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
          tit: '添加销售案例类型'
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑销售案例类型',
          id: item.id,
          name: item.name,
          weight: item.weight
        });
        this.$nextTick(() => {
          this.centerDialogVisible = true;
        });
      },
      // 点击确定
      submitOK () {
        if (!this.tcObj.name) {
          this.$message.error('请填入案例类型名称');
          return;
        }
        if (!this.tcObj.weight) {
          this.$message.error('请填入权重');
          return;
        }
        let options = {
          action: 'add',
          name: this.tcObj.name,
          weight: this.tcObj.weight
        };
        // 编辑状态
        if (this.tcObj.id) {
          options = Object.assign({}, options, {
            action: 'update',
            id: this.tcObj.id
          });
        }
        this.Api.saletype(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            this.centerDialogVisible = false;
            this.getCaseTypeList();
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      // 删除操作
      deleteOprate (item) {
        let options = {
          action: 'del',
          id: item.id
        };
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Api.saletype(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getCaseTypeList();
            } else {
              this.Api.handleError(data.msg);
            }
          })
          .catch(error => {
            this.Api.handleError(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
