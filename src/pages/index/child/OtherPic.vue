<template>
  <div class="other-pic">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加素材图</el-button>
    </div>

    <el-table
      :data="otherPicData"
      border
      style="width: 100%">
      <el-table-column
        label="素材"
        align="center">
        <template slot-scope="scope">
          <img class="w80" :src="scope.row.logo" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="url" label="素材图片地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.logo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.update_time }}
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
          <span class="inline-block w100">Sucai：</span>
          <div class="w300 inline-block">
            <img class="vm inline-block" style="width:60px;height:60px;" v-if="tcObj.logo" :src="tcObj.logo" alt="">
            <el-upload
              class="upload-demo inline-block vm"
              :show-file-list="false"
              :action="actionSucai()"
              :on-success="handleAvatarSuccess"
              multiple>
              <el-button class="vm" size="small" type="primary">点击上传Sucai</el-button>
            </el-upload>
          </div>
        </div>
        <div class="mb10">
          <span class="inline-block w100">标题：</span>
          <el-input size="small" class="w300" v-model="tcObj.title" placeholder="请输入标题"></el-input>
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
    name: 'other-pic',
    data () {
      return {
        otherPicData: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载产品列表数据 & 商品类型列表
      this.getSucai();
    },
    methods: {
      getSucai () {
        let options = {
          action: 'find',
          type: '5'
        };
        this.Api.saveimg(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.otherPicData = _data.map((item) => {
              item.logo = this.Config.IMG_BASE_URL + item.logo;
              return item;
            });
            console.log('Sucai data->', _data);
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
          tit: '添加Sucai',
          logo: '',
          title: '',
          type: '5',
          url: ''
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑Sucai',
          id: item.id,
          logo: item.logo,
          title: item.title,
          type: '5',
          url: item.url
        });
        this.$nextTick(() => {
          this.centerDialogVisible = true;
        });
      },
      // 点击确定
      submitOK () {
        let _logo = '';
        if (this.tcObj.logo.indexOf(this.Config.IMG_BASE_URL) !== -1) {
          _logo = this.tcObj.logo.replace(new RegExp(this.Config.IMG_BASE_URL), '');
        } else {
          _logo = this.tcObj.logo;
        }
        let options = {
          action: 'add',
          logo: _logo,
          title: this.tcObj.title,
          type: this.tcObj.type,
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
        this.Api.saveimg(options)
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
            this.getSucai();
            this.centerDialogVisible = false;
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      handleAvatarSuccess (res) {
        let imgItem = {
          imgurl: 'http://' + res.data.imgurl,
          name: res.data.name
        };
        // console.log(this.tcObj.img);
        this.tcObj.logo = this.Config.IMG_BASE_URL + imgItem.name;
      },
      actionSucai () {
        return this.Config.API_BASE_URL + '/fileUpload.php';
      },
      // 删除操作
      deleteOprate (item) {
        let options = {
          action: 'del',
          id: item.id,
          type: '5'
        };
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Api.saveimg(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getSucai();
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
