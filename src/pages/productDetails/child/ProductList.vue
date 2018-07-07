<template>
  <div class="product-list">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加产品</el-button>
    </div>
    <el-table
      :data="productListData"
      border
      style="width: 100%">
      <el-table-column
        prop="tname"
        label="所属类型"
        align="center">
      </el-table-column>

      <el-table-column
        label="营销类型"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type === '1'">热销</span>
          <span v-else>新品</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="产品名称"
        align="center">
      </el-table-column>

      <el-table-column
        prop="url"
        label="产品链接"
        align="center">
      </el-table-column>

      <el-table-column
        label="产品图片"
        align="center">
        <template slot-scope="scope">
          <img style="width:40px;height:40px;" v-for="(item, index) in scope.row.img" :src="item" :key="index" alt="">
        </template>
      </el-table-column>

      <el-table-column
        label="缩略图"
        align="center">
        <template slot-scope="scope">
          <img style="width:40px;height:40px;" v-for="(item, index) in scope.row.imgsmall" :src="item" :key="index" alt="">
        </template>
      </el-table-column>

      <el-table-column
        prop="money"
        label="价格"
        align="center">
      </el-table-column>

      <el-table-column
        prop="seoname"
        label="SEO描述"
        align="center">
      </el-table-column>

      <el-table-column
        prop="descinfo"
        label="产品描述"
        align="center">
      </el-table-column>

      <el-table-column
        prop="keyword"
        label="关键词"
        align="center">
      </el-table-column>

      <el-table-column
        label="适合场景"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.scene === '1'">公园</span>
          <span v-else-if="scope.row.scene === '2'">旅游景点</span>
          <span v-else-if="scope.row.scene === '3'">小区</span>
          <span v-else-if="scope.row.scene === '4'">购物商场</span>
          <span v-else-if="scope.row.scene === '5'">游乐场所</span>
          <span v-else>室外观光</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">正常</span>
          <span v-else>下架</span>
        </template>
      </el-table-column>

      <el-table-column
        label="是否热销"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.hotsale === '0'">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作" width="150">
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
          <span class="inline-block w100">所属类型：</span>
          <el-select size="small" class="w300" v-model="tcObj.tid" placeholder="请选择">
            <el-option
              v-for="item in tnameList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="mb10">
          <span class="inline-block w100">营销类型：</span>
          <el-select size="small" class="w300" v-model="tcObj.type" placeholder="请选择">
            <el-option key="1" label="热销" value="1"></el-option>
            <el-option key="2" label="新品" value="2"></el-option>
          </el-select>
        </div>
        <div class="mb10">
          <span class="inline-block w100">产品名称：</span>
          <el-input size="small" class="w300" v-model="tcObj.name"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">购买链接：</span>
          <el-input size="small" class="w300" v-model="tcObj.url"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">产品图片：</span>
          <div class="inline-block w300 tl">
            <span class="inline-block pr mr10 vt" v-if="tcObj.img && tcObj.img.length > 0" v-for="(item, index) in tcObj.img">
              <img style="width:60px;height:60px;" :src="item" :key="index" alt="">
              <i @click="deleteItemImg(item)" class="el-icon-circle-close-outline f16" style="position:absolute;z-index:2;top:-5px;right:-5px;"></i>
            </span>
            <el-upload
              class="upload-demo"
              :show-file-list="false"
              :action="actionProduct()"
              :on-success="handleAvatarSuccess"
              multiple>
              <el-button class="vt" size="small" type="primary">上传产品图片</el-button>
            </el-upload>
          </div>
        </div>
        <div class="mb10">
          <span class="inline-block w100">所有缩略图：</span>
          <div class="inline-block w300 tl">
            <span class="inline-block pr mr10 vt" v-if="tcObj.imgsmall && tcObj.imgsmall.length > 0" v-for="(item, index) in tcObj.imgsmall">
              <img style="width:60px;height:60px;" :src="item" :key="index" alt="">
              <i @click="deleteItemImgsmall(item)" class="el-icon-circle-close-outline f16" style="position:absolute;z-index:2;top:-5px;right:-5px;"></i>
            </span>
            <el-upload
              class="upload-demo"
              :show-file-list="false"
              :action="actionProduct()"
              :on-success="handleImgSmallSuccess"
              multiple>
              <el-button class="vt" size="small" type="primary">上传产品缩略图</el-button>
            </el-upload>
          </div>
        </div>
        <div class="mb10">
          <span class="inline-block w100">价格：</span>
          <el-input size="small" type="number" class="w300" v-model="tcObj.money"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">seo：</span>
          <el-input size="small" class="w300" v-model="tcObj.seoname"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">产品描述：</span>
          <el-input size="small" class="w300" v-model="tcObj.descinfo"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">关键词：</span>
          <el-input size="small" class="w300" v-model="tcObj.keyword"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">产品详情：</span>
          <el-input size="small" class="w300" type="textarea" v-model="tcObj.detail"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">技术参数：</span>
          <el-input size="small" class="w300" type="textarea" v-model="tcObj.technical"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">售后：</span>
          <el-input size="small" class="w300" type="textarea" v-model="tcObj.sale"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">状态：</span>
          <el-select size="small" class="w300" v-model="tcObj.status" placeholder="请选择">
            <el-option key="0" label="正常" value="0"></el-option>
            <el-option key="-1" label="下架" value="-1"></el-option>
          </el-select>
        </div>
        <div class="mb10">
          <span class="inline-block w100">是否热销：</span>
          <div class="inline-block w300 tl">
            <el-checkbox v-model="tcObj.hotsale"></el-checkbox>
          </div>
        </div>
        <div class="mb10">
          <span class="inline-block w100">权重：</span>
          <el-input size="small" class="w300" type="number" v-model="tcObj.weight"></el-input>
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
        productListData: [],
        tnameList: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载产品列表数据 & 商品类型列表
      this.getProductList();
      this.getGoodsTypeList();
    },
    methods: {
      getProductList () {
        let options = {
          action: 'find'
        };
        this.Api.goods(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.productListData = _data.map((item) => {
              item.img = item.img.map((i) => {
                let _img = '';
                if (i.indexOf(this.Config.IMG_BASE_URL) !== -1) {
                  _img = i.replace(new RegExp(this.Config.IMG_BASE_URL), '');
                } else {
                  _img = i;
                }
                return this.Config.IMG_BASE_URL + _img;
              });
              item.imgsmall = item.imgsmall.map((i) => {
                let _imgsmall = '';
                if (i.indexOf(this.Config.IMG_BASE_URL) !== -1) {
                  _imgsmall = i.replace(new RegExp(this.Config.IMG_BASE_URL), '');
                } else {
                  _imgsmall = i;
                }
                return this.Config.IMG_BASE_URL + _imgsmall;
              });
              return item;
            });
            console.log('this.productListData: -->', this.productListData)
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      // 获取商品类型
      getGoodsTypeList () {
        let options = {
          action: 'find'
        };
        this.Api.goodstype(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            this.tnameList = data.data;
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
        this.tcObj.img.push(this.Config.IMG_BASE_URL + imgItem.name);
      },
      handleImgSmallSuccess (res) {
        let imgSmallItem = {
          imgurl: 'http://' + res.data.imgurl,
          name: res.data.name
        };
        this.tcObj.imgsmall.push(this.Config.IMG_BASE_URL + imgSmallItem.name);
      },
      actionProduct () {
        return this.Config.API_BASE_URL + '/fileUpload.php';
      },
      addOprate () {
        this.tcObj = Object.assign({}, {
          tit: '添加产品类别',
          tid: '',
          type: '',
          name: '',
          url: '',
          img: [],
          imgsmall: [],
          money: '',
          seoname: '',
          descinfo: '',
          keyword: '',
          detail: '',
          technical: '',
          sale: '',
          status: '',
          hotsale: '',
          weight: ''
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        let _hotsale;
        if (item.hotsale) {
          _hotsale = true;
        } else {
          _hotsale = false;
        }
        this.tcObj = Object.assign({}, {
          tit: '编辑产品类别',
          id: item.id,
          tid: item.tid,
          type: item.type,
          name: item.name,
          url: item.url,
          img: item.img,
          imgsmall: item.imgsmall,
          money: item.money,
          seoname: item.seoname,
          descinfo: item.descinfo,
          keyword: item.keyword,
          detail: item.detail,
          technical: item.technical,
          sale: item.sale,
          status: item.status,
          hotsale: _hotsale,
          weight: item.weight
        });
        this.$nextTick(() => {
          this.centerDialogVisible = true;
        });
      },
      // 点击确定
      submitOK () {
        let _imgArr = [];
        _imgArr = this.tcObj.img.map((i) => {
          let _img = '';
          if (i.indexOf(this.Config.IMG_BASE_URL) !== -1) {
            _img = i.replace(new RegExp(this.Config.IMG_BASE_URL), '');
          } else {
            _img = i;
          }
          return _img;
        });
        let _imgsmallArr = [];
        _imgsmallArr = this.tcObj.imgsmall.map((i) => {
          let _imgsmall = '';
          if (i.indexOf(this.Config.IMG_BASE_URL) !== -1) {
            _imgsmall = i.replace(new RegExp(this.Config.IMG_BASE_URL), '');
          } else {
            _imgsmall = i;
          }
          return _imgsmall;
        });

        let options = {
          action: 'add',
          tid: this.tcObj.tid,
          type: this.tcObj.type,
          name: this.tcObj.name,
          url: this.tcObj.url,
          img: _imgArr,
          imgsmall: _imgsmallArr,
          money: this.tcObj.money,
          seoname: this.tcObj.seoname,
          descinfo: this.tcObj.descinfo,
          keyword: this.tcObj.keyword,
          detail: this.tcObj.detail,
          technical: this.tcObj.technical,
          sale: this.tcObj.sale,
          status: this.tcObj.status,
          hotsale: this.tcObj.hotsale ? 1 : 0,
          weight: this.tcObj.weight
        };
        // 编辑状态
        if (this.tcObj.id) {
          options = Object.assign({}, options, {
            action: 'update',
            id: this.tcObj.id
          });
        }
        // console.log(options);
        // return false;
        this.Api.goods(options)
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
            this.getProductList();
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
          id: item.id
        };
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Api.goods(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getProductList();
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
      },
      deleteItemImg (item) {
        this.tcObj.img = this.tcObj.img.filter((i) => {
          return i !== item
        });
      },
      deleteItemImgsmall (item) {
        this.tcObj.imgsmall = this.tcObj.imgsmall.filter((i) => {
          return i !== item
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
