<template>
  <div class="product-list">
    <el-table
      :data="messagesListData"
      border
      style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="tel" label="电话" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column prop="content" label="内容" align="center"></el-table-column>
      <el-table-column prop="addtime" label="发起时间" align="center"></el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">未读</span>
          <span v-if="scope.row.status === '-1'">已读</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '0'" type="primary" size="small" @click="editOprate(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteOprate(scope.row)">删除</el-button>
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
          <span class="inline-block w100">更改状态：</span>
          <el-select size="small" class="w200" v-model="tcObj.status" placeholder="请选择">
            <el-option key="0" label="未读" value="0"></el-option>
            <el-option key="-1" label="已读" value="-1"></el-option>
          </el-select>
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
        messagesListData: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载在线留言数据
      this.getMessagesList();
    },
    methods: {
      getMessagesList () {
        let options = {
          action: 'find'
        };
        this.Api.message(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.messagesListData = _data;
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      // 点击确定
      submitOK () {
        let options = {
          action: 'update',
          id: this.tcObj.id,
          name: this.tcObj.name,
          email: this.tcObj.email,
          tel: this.tcObj.tel,
          address: this.tcObj.address,
          content: this.tcObj.content,
          addtime: this.tcObj.addtime,
          status: this.tcObj.status
        };
        console.log('options: -->', options);
        // return false;
        this.Api.message(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            this.$message.success('Edit Success');
            this.getMessagesList();
            this.centerDialogVisible = false;
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑留言',
          id: item.id,
          name: item.name,
          email: item.email,
          tel: item.tel,
          address: item.address,
          content: item.content,
          addtime: item.addtime,
          status: item.status
        });
        this.$nextTick(() => {
          this.centerDialogVisible = true;
        });
      },
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
          this.Api.message(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getMessagesList();
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
