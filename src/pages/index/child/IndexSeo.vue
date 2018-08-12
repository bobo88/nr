<template>
  <div class="index-seo">
    <div class="mb10">
      <el-button v-if="indexSeoData && indexSeoData.length === 0" type="success" size="small" @click="addOprate">配置首页SEO</el-button>
    </div>

    <el-table
      :data="indexSeoData"
      border
      style="width: 100%">
      <el-table-column prop="name" label="关键字内容" align="center"></el-table-column>
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
          <span class="inline-block w100">首页SEO：</span>
          <el-input size="small" class="w300" v-model="tcObj.name" placeholder="请输入首页SEO"></el-input>
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
    name: 'index-seo',
    data () {
      return {
        indexSeoData: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载产品列表数据 & 商品类型列表
      this.getIndexSeo();
    },
    methods: {
      getIndexSeo () {
        let options = {
          action: 'find',
          type: '1'
        };
        this.Api.keyword(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.indexSeoData = _data;
            console.log('IndexSeo data->', _data);
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
          tit: '添加首页SEO配置',
          logo: '',
          title: '',
          type: '1',
          url: ''
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑首页SEO配置',
          id: item.id,
          name: item.name,
          type: '0'
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
          type: '0'
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
        this.Api.keyword(options)
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
            this.getIndexSeo();
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
          type: '0'
        };
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Api.keyword(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getIndexSeo();
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
