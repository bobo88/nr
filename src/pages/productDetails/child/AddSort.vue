<template>
  <div class="add-sort">
    <div class="mb10">
      <el-button type="success" size="small" @click="addOprate">添加所属分类</el-button>
    </div>
    <el-table
      :data="sortListData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="所属类型"
        align="center">
      </el-table-column>

      <el-table-column label="适合场景" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row._sceneName }}</span>
          <!-- <span v-if="scope.row.scene === '1'">公园</span>
          <span v-else-if="scope.row.scene === '2'">旅游景点</span>
          <span v-else-if="scope.row.scene === '3'">小区</span>
          <span v-else-if="scope.row.scene === '4'">购物商场</span>
          <span v-else-if="scope.row.scene === '5'">游乐场所</span>
          <span v-else>室外观光</span> -->
        </template>
      </el-table-column>

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
          <span class="inline-block w100">所属分类：</span>
          <el-input size="small" class="w200" v-model="tcObj.sortName"></el-input>
        </div>
        <div class="mb10">
          <span class="inline-block w100">适合场景：</span>
          <el-select multiple size="small" class="w200" v-model="tcObj.scene" placeholder="请选择">
            <el-option v-for="(item, index) in sceneListData" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
    name: 'add-sort',
    data () {
      return {
        sortListData: [],
        sceneListData: [],
        tnameList: [],
        centerDialogVisible: false,
        tcObj: {}
      }
    },
    created () {
      // 页面一进来，加载数据
      this.getSceneList();
    },
    methods: {
      getSceneList () {
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
            this.sceneListData = _data;
            this.getSortList();
          } else {
            this.Api.handleError(data.msg);
          }
        })
        .catch(error => {
          this.Api.handleError(error)
        })
      },
      getSortList () {
        let options = {
          action: 'find'
        };
        this.Api.goodstype(options)
        .then(res => {
          return this.Api.checkResponse(res)
        })
        .then(data => {
          if (data.err === 0) {
            let _data = data.data;
            this.sortListData = _data.map((item) => {
              // let _item = item;
              // _item._sceneName = [];
              item._sceneName = item.scene.substr(1, item.scene.length - 2).split(',');
              item._sceneName = item._sceneName.map((i) => {
                let _sceneNameArr = this.sceneListData.filter((s) => {
                  return s.id === i
                }).map((n) => {
                  return n.name
                });
                return _sceneNameArr;
              }).join(', ');
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
      addOprate () {
        this.tcObj = Object.assign({}, {
          tit: '添加所属分类'
        });
        this.centerDialogVisible = true;
      },
      editOprate (item) {
        let _scene = item.scene.substr(1, item.scene.length - 2).split(',');
        this.tcObj = Object.assign({}, {
          tit: '编辑所属分类',
          id: item.id,
          sortName: item.name,
          scene: _scene,
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
        let _scene = this.tcObj.scene.join(',');
        let options = {
          action: 'add',
          name: this.tcObj.sortName,
          scene: ',' + _scene + ',',
          weight: this.tcObj.weight
        };
        // 编辑状态
        if (this.tcObj.id) {
          options = Object.assign({}, options, {
            action: 'update',
            id: this.tcObj.id
          });
        }
        this.Api.goodstype(options)
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
          this.Api.goodstype(options)
          .then(res => {
            return this.Api.checkResponse(res)
          })
          .then(data => {
            if (data.err === 0) {
              this.$message.success('Delete Success');
              this.getSortList();
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
