<template>
  <div class="product-list">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加案例</el-button>
    </div>
    <el-table
      :data="caseListData"
      border
      style="width: 100%">
      <el-table-column prop="name" label="案例图片" align="center" width="150">
        <template slot-scope="scope">
          <img style="width:60px;height:60px;" :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="案例名称" align="center" width="150"></el-table-column>
      <el-table-column prop="tname" label="销售案列类型" align="center"></el-table-column>

      <el-table-column prop="createtime" label="时间" align="center"></el-table-column>

      <el-table-column prop="total" label="浏览量" align="center"></el-table-column>
      <el-table-column prop="descont" label="描述" align="center"></el-table-column>

      <el-table-column label="案例内容" width="220" align="center">
        <template slot-scope="scope">
          <p class="w200 ellipsis lh34">{{ scope.row.detail }}</p>
        </template>
      </el-table-column>

      <el-table-column prop="source" label="链接" align="center"></el-table-column>

      <el-table-column label="文章类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type === '1'">最新</span>
          <span v-if="scope.row.type === '2'">热销</span>
        </template>
      </el-table-column>

      <el-table-column label="案例状态" align="center">
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
          <span class="inline-block w100">案列名称：</span>
          <el-input size="small" class="w200" v-model="tcObj.name" placeholder="请输入案列名称"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">案列图片：</span>
          <div class="inline-block w200 tl">
            <el-upload
              class="upload-demo"
              :show-file-list="false"
              :action="actionProduct()"
              :on-success="handleAvatarSuccess"
              multiple>
              <img class="vt" style="width:40px;height:40px;" v-if="tcObj.img" :src="tcObj.img" alt="">
              <el-button class="vt" size="small" type="primary">上传案例图片</el-button>
            </el-upload>
          </div>
        </div>
        <div class="mb10">
          <span class="inline-block w100">浏览量：</span>
          <el-input size="small" class="w200" v-model="tcObj.total" placeholder="请输入浏览量"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">描述：</span>
          <el-input size="small" class="w200" v-model="tcObj.descont" placeholder="请输入描述"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">案例详情：</span>
          <el-input type="textarea" size="small" class="w200" v-model="tcObj.detail" placeholder="请输入案例详情"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">来源：</span>
          <el-input size="small" class="w200" v-model="tcObj.source" placeholder="请输入来源"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">文章类型：</span>
          <el-select size="small" class="w200" v-model="tcObj.type" placeholder="请选择">
            <el-option key="0" label="最新" value="1"></el-option>
            <el-option key="1" label="热销" value="2"></el-option>
          </el-select>
        </div>
        <div class="mb10">
          <span class="inline-block w100">销售案列类型：</span>
          <el-select size="small" class="w200" v-model="tcObj.tid" placeholder="请选择">
            <el-option :key="index" v-for="(item, index) in saletypeList" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>

        <div class="mb10">
          <span class="inline-block w100">案例状态：</span>
          <el-select size="small" class="w200" v-model="tcObj.status" placeholder="请选择">
            <el-option key="0" label="正常" value="0"></el-option>
            <el-option key="-1" label="下架" value="-1"></el-option>
          </el-select>
        </div>
        <div class="mb10">
          <span class="inline-block w100">权重：</span>
          <el-input size="small" class="w200" v-model="tcObj.weight" placeholder="请输入权重"></el-input>
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
        caseListData: [],
        saletypeList: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载案例列表数据 & 商品类型列表
      this.getCaseList();
      this.getSaleTypeList();
    },
    methods: {
      getCaseList () {
        let options = {
          action: 'find'
        };
        this.Api.sale(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.caseListData = _data.map((item) => {
              item.img = this.Config.IMG_BASE_URL + item.img;
              return item;
            });
            console.log(this.saletypeList)
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      // 销售l案例类型接口
      getSaleTypeList () {
        let options = {
          action: 'find'
        };
        this.Api.saletype(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            this.saletypeList = data.data;
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
          tit: '添加案例',
          tid: '',
          type: '',
          name: '',
          img: [],
          total: '',
          descont: '',
          detail: '',
          source: '',
          status: '',
          weight: ''
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
          tid: this.tcObj.tid,
          type: this.tcObj.type,
          name: this.tcObj.name,
          img: _img,
          total: this.tcObj.total,
          descont: this.tcObj.descont,
          detail: this.tcObj.detail,
          source: this.tcObj.source,
          status: this.tcObj.status,
          weight: this.tcObj.weight
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
        this.Api.sale(options)
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
            this.getCaseList();
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
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑销售案例',
          id: item.id,
          tid: item.tid,
          type: item.type,
          name: item.name,
          img: item.img,
          total: item.total,
          descont: item.descont,
          detail: item.detail,
          source: item.source,
          status: item.status,
          weight: item.weight
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
          this.Api.sale(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getCaseList();
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
