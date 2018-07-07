<template>
  <div class="product-list">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加新闻</el-button>
    </div>
    <el-table
      :data="newsListData"
      border
      style="width: 100%">
      <el-table-column prop="name" label="新闻图片" align="center" width="150">
        <template slot-scope="scope">
          <img style="width:60px;height:60px;" :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="新闻标题" align="center"></el-table-column>
      <el-table-column prop="descinfo" label="新闻简讯简介" align="center"></el-table-column>
      <el-table-column prop="content" label="内容详情" align="center"></el-table-column>
      <el-table-column prop="url" label="外部链接地址" align="center"></el-table-column>
      <el-table-column prop="newsdata" label="资讯时间" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>

      <el-table-column label="新闻状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">正常</span>
          <span v-if="scope.row.status === '-1'">下架</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editOprate(scope.row)">编辑</el-button>
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
          <span class="inline-block w100">资讯标题：</span>
          <el-input size="small" class="w200" v-model="tcObj.title" placeholder="请输入资讯标题"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">新闻图片：</span>
          <div class="inline-block w200 tl">
            <el-upload
              class="upload-demo"
              :show-file-list="false"
              :action="actionProduct()"
              :on-success="handleAvatarSuccess"
              multiple>
              <img class="vt" style="width:40px;height:40px;" v-if="tcObj.img" :src="tcObj.img" alt="">
              <el-button class="vt" size="small" type="primary">上传新闻图片</el-button>
            </el-upload>
          </div>
        </div>
        <div class="mb10">
          <span class="inline-block w100">新闻简讯简介：</span>
          <el-input size="small" type="textarea" class="w200" v-model="tcObj.descinfo" placeholder="请输入新闻简讯简介"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">内容详情：</span>
          <el-input size="small" type="textarea" class="w200" v-model="tcObj.content" placeholder="请输入内容详情"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">外部链接地址：</span>
          <el-input size="small" class="w200" v-model="tcObj.url" placeholder="请输入外部链接地址"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">资讯时间：</span>
          <el-input size="small" class="w200" v-model="tcObj.newsdata" placeholder="请输入资讯时间"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">状态：</span>
          <el-select size="small" class="w200" v-model="tcObj.status" placeholder="请选择">
            <el-option key="0" label="正常" value="0"></el-option>
            <el-option key="-1" label="禁用" value="-1"></el-option>
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
        newsListData: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载新闻列表数据
      this.getNewsList();
    },
    methods: {
      getNewsList () {
        let options = {
          action: 'find'
        };
        this.Api.news(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.newsListData = _data.map((item) => {
              item.img = this.Config.IMG_BASE_URL + item.img;
              return item;
            });
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
        // console.log(this.tcObj.img); // IMG_BASE_URL
        this.tcObj.img = this.Config.IMG_BASE_URL + imgItem.name;
      },
      actionProduct () {
        return this.Config.API_BASE_URL + '/fileUpload.php';
      },
      addOprate () {
        this.tcObj = Object.assign({}, {
          tit: '添加新闻',
          img: '',
          title: '',
          descinfo: '',
          content: '',
          url: '',
          newsdata: '',
          status: ''
        });
        this.centerDialogVisible = true;
      },
      // 点击确定
      submitOK () {
        let _img = '';
        if (this.tcObj.img.indexOf(this.Config.IMG_BASE_URL) !== -1) {
          _img = this.tcObj.img.replace(new RegExp(this.Config.IMG_BASE_URL), '');
        } else {
          _img = this.tcObj.img;
        }
        let options = {
          action: 'add',
          img: _img,
          title: this.tcObj.title,
          descinfo: this.tcObj.descinfo,
          content: this.tcObj.content,
          url: this.tcObj.url,
          newsdata: this.tcObj.newsdata,
          status: this.tcObj.status
        };
        // 编辑状态
        if (this.tcObj.id) {
          options = Object.assign({}, options, {
            action: 'update',
            id: this.tcObj.id
          });
        }
        console.log('options: -->', options);
        // return false;
        this.Api.news(options)
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
            this.getNewsList();
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
          tit: '编辑新闻',
          id: item.id,
          img: item.img,
          title: item.title,
          descinfo: item.descinfo,
          content: item.content,
          url: item.url,
          newsdata: item.newsdata,
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
          this.Api.news(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getNewsList();
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
