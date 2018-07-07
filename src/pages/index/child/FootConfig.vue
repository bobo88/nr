<template>
  <div class="foot-config">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加底部分类</el-button>
    </div>

    <el-table
      :data="footeConfigData"
      border
      style="width: 100%">
      <el-table-column prop="name" label="标题" align="center"></el-table-column>
      <el-table-column prop="url" label="链接地址" align="center"></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editOprate(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteOprate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="tcObj.tit"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <div class="tc-main">
        <div class="mb10">
          <span class="inline-block w100">标题：</span>
          <el-input size="small" class="w300" v-model="tcObj.name" placeholder="请输入标题"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">链接地址：</span>
          <el-input size="small" class="w300" v-model="tcObj.url" placeholder="请输入链接地址"></el-input>
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
    name: 'foot-config',
    data () {
      return {
        footeConfigData: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载产品列表数据 & 商品类型列表
      this.getFooterList();
    },
    methods: {
      getFooterList () {
        let options = {
          action: 'find'
        };
        this.Api.footer(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.footeConfigData = _data;
            console.log('Footer data->', _data);
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
          tit: '添加底部分类',
          name: '',
          url: ''
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑底部分类',
          id: item.id,
          name: item.name,
          url: item.url
        });
        this.$nextTick(() => {
          this.centerDialogVisible = true;
        });
      },
      // 点击确定
      submitOK () {
        let options = {
          action: 'add',
          name: this.tcObj.name,
          url: this.tcObj.url
        };
        // 编辑状态
        if (this.tcObj.id) {
          options = Object.assign({}, options, {
            action: 'update',
            id: this.tcObj.id
          });
        }
        console.log(options);
        // return false;
        this.Api.footer(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            if (this.tcObj.id) {
              this.$message.success('Edit Success');
            } else {
              this.$message.success('Add Success');
            }
            this.getFooterList();
            this.centerDialogVisible = false;
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
          id: item.id,
          type: '1'
        };
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Api.footer(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getFooterList();
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
