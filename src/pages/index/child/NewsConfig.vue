<template>
  <div class="news-config">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加新闻资讯</el-button>
    </div>
    <el-table
      :data="newsConfigData"
      border
      style="width: 100%">
      <el-table-column
        label="资讯图"
        align="center">
        <template slot-scope="scope">
          <img class="w80" :src="scope.row.newsImgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        prop="newsTitle"
        align="center">
      </el-table-column>
      <el-table-column
        label="简介"
        prop="newsSummary"
        align="center">
      </el-table-column>
      <el-table-column
        prop="linkUrl"
        label="链接"
        align="center">
      </el-table-column>
      <el-table-column
        prop="newsTime"
        label="时间"
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
          <span class="inline-block w150">资讯图：</span>
          <el-upload
            class="upload-demo inline-block"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed">
            <img class="w100" v-if="tcObj.newsImgUrl" :src="tcObj.newsImgUrl" alt="">
            <el-button v-else size="small" type="primary">点击上传资讯图</el-button>
          </el-upload>
        </div>
        <div class="mb10">
          <span class="inline-block w150">标题：</span>
          <el-input size="small" class="w200" v-model="tcObj.newsTitle" placeholder="请输入标题"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w150">简介：</span>
          <el-input size="small" class="w200" v-model="tcObj.newsSummary" placeholder="请输入简介"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w150">链接地址：</span>
          <el-input size="small" class="w200" v-model="tcObj.linkUrl" placeholder="请输入链接地址"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w150">位置：</span>
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
    name: 'news-config',
    data () {
      return {
        newsConfigData: [
          {
            newsImgUrl: 'https://gloimg.gbtcdn.com/soa/gb/pdm-product-pic/Electronic/2018/03/31/goods-img/1522444816428151716.jpg',
            newsTitle: '电动车电动车',
            newsSummary: '电动车电动车',
            linkUrl: 'http://www.baidu.com',
            newsTime: '2018-06-06',
            position: 1
          },
          {
            newsImgUrl: 'https://gloimg.gbtcdn.com/gb/pdm-product-pic/Electronic/2017/11/09/goods-img/1516939450612590317.jpg',
            newsTitle: '电动车电动车222222',
            newsSummary: '电动车电动车222222',
            linkUrl: 'http://www.baidu.com',
            newsTime: '2018-06-06',
            position: 2
          }
        ],
        newsImgUrl: '',
        newsTitle: '',
        newsSummary: '',
        linkUrl: '',
        newsTime: '',
        position: '',
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    methods: {
      addOprate () {
        this.tcObj = Object.assign({}, {
          tit: '添加新闻资讯'
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        this.tcObj = Object.assign({}, {
          tit: '编辑新闻资讯',
          newsImgUrl: item.newsImgUrl,
          newsTitle: item.newsTitle,
          newsSummary: item.newsSummary,
          linkUrl: item.linkUrl,
          newsTime: item.newsTime,
          position: item.position
        });
        this.$nextTick(() => {
          this.centerDialogVisible = true;
        });
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`);
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
