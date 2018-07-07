<template>
  <div class="user-list">
    <h1 class="common-tit">User List</h1>

    <div class="clearfix mb10">
      <span>User Name：</span>
      <el-input size="small" class="w200 mr15" v-model.trim="userName" placeholder="Please enter user name"></el-input>

      <span>User Type：</span>
      <el-select size="small" id="userType" class="w150 mr15 mb10" v-model="userType" placeholder="Please select">
        <el-option key="-1" label="All" value="-1"></el-option>
        <el-option v-for="(item, index) in userTypeList" :key="index" :label="item.tit" :value="item.tit"></el-option>
      </el-select>

      <el-button size="small" @click="search" type="primary" plain>Search</el-button>
      <el-button type="primary" size="small" @click="addOprate">Add User</el-button>
    </div>

    <div class="list-cont mb10">
      <el-table ref="multipleTable" border :data="UserList" tooltip-effect="dark" style="width:100%;">
        <el-table-column align="center" label="ID" prop="id"></el-table-column>
        <el-table-column align="center" label="User Type" prop="userType"></el-table-column>
        <el-table-column align="center" label="User Name" prop="userName"></el-table-column>
        <el-table-column align="center" label="Account ID" prop="accountID"></el-table-column>
        <el-table-column align="center" label="Registration Time" prop="regTime"></el-table-column>
        <el-table-column align="center" label="Action">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editOprate(scope.row)">Manage</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="bo-pagination tr mb10">
      <el-pagination layout="total, sizes, prev, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNum" :page-sizes="[5, 10, 25, 50]" :page-size="pageSize" :total="total">
      </el-pagination>
    </div>

    <!-- 添加/编辑 消息 弹窗 -->
    <add-user ref="addUserTc" @cb="addSucc" :tc-obj="addUserData"></add-user>
  </div>
</template>

<script>
  import AddUser from '@/pages/accountManagement/child/AddUser';

  export default {
    name: 'user-list',
    components: {
      AddUser
    },
    data () {
      return {
        userName: '',
        userType: '-1',
        userTypeList: [
          {
            val: '1',
            tit: 'Manager'
          },
          {
            val: '2',
            tit: 'Advisters'
          },
          {
            val: '3',
            tit: 'Publiser'
          }
        ],
        UserList: [],

        // 传递到 新增/编辑 弹窗对象
        addUserData: {},
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    },
    created () {
      this.$nextTick(() => {
        this.getUserList();
      });
    },
    methods: {
      search () {
        this.getUserList();
      },

      getUserList () {
        this.UserList = [
          {
            id: 1,
            userType: 'Manager',
            userName: 'yomobi1111',
            accountID: 'aaaa',
            regTime: '2018/5/22'
          },
          {
            id: 2,
            userType: 'Advisters',
            userName: 'yomobi2222',
            accountID: 'bbbb',
            regTime: '2018/6/11'
          },
          {
            id: 3,
            userType: 'Publiser',
            userName: 'yomobi3333',
            accountID: 'cccc',
            regTime: '2018/7/15'
          }
        ];
        // this.Api.getUserList()
        // .then(res => {
        //   return this.Api.checkResponse(res)
        // })
        // .then(data => {
        //   let _list = data.data.itemList;
        //   this.UserList = _list;
        //   this.total = data.data.total;

        //   for (let i = 0; i < _list.length; i++) {
        //     _list[i].impressionsPercent = ((_list[i].clickCount / _list[i].impressions) * 100).toFixed(2) + '%';
        //     _list[i].revenueVal = (_list[i].payout * _list[i].clickCount).toFixed(2);
        //   }
        // })
        // .catch(error => {
        //   this.Api.handleError(error)
        // })
      },
      handleSizeChange (val) {
        this.pageSize = val;
        this.getUserList();
      },
      handleCurrentChange (val) {
        this.pageNum = val;
        this.getUserList();
      },

      addOprate () {
        this.addUserData = Object.assign({}, {
          type: 0,
          title: 'Add User'
        });
        this.$refs.addUserTc.show();
      },
      editOprate (item) {
        this.addUserData = Object.assign({}, {
          type: 1,
          title: 'Manage User'
        });
        this.$refs.addUserTc.show();
      },

      // 添加成功应用内消息 回调函数
      addSucc () {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
