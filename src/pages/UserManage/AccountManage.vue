<template>
  <div class="sign_contract">
    <div class="sign_title">
      <div>
        <el-button icon="el-icon-d-arrow-left" type="primary" @click="go">基金合同</el-button>
      </div>&nbsp;&nbsp;&nbsp;
      <p>发起签约</p>
    </div>
    <!-- 数据表单 -->
    <div class="Risk_data">
      <div class="Risk_count">
        <el-input v-model="nikoName" placeholder="输入机构名称搜索" @keyup.enter.native="handleIconClick"></el-input>
        <el-button icon="el-icon-search" @click="handleIconClick"></el-button>
        <el-button icon="el-icon-plus" @click="dialogUser=true">新增用户</el-button>
      </div>
      <el-table :data="subscriptionData" stripe id="out-table" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" type="index" prop="data" label="序号"></el-table-column>
        <el-table-column align="center" prop="data" label="用户名称">
          <template slot-scope="scope">
            <span>{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="签约状态">
          <template slot-scope="scope">
            <span>{{scope.row.signStatusName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="下发时间">
          <template slot-scope="scope">
            <span>{{scope.row.downTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="签署时间(投资人)">
          <template slot-scope="scope">
            <span>{{scope.row.signTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="签署时间(管理人)">
          <template slot-scope="scope">
            <span>{{scope.row.checkTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="通知类型">
          <template slot-scope="scope">
            <div v-if="scope.row.downTime != null">
              <span>{{scope.row.smsNotify==1?'短信通知':''}}&nbsp;{{scope.row.emailNotify==1?'邮件通知':''}}&nbsp;{{scope.row.weChatNotify==1?'微信通知':''}}</span>
            </div>
            <div v-else>
              <el-checkbox-group v-model="scope.row.smsNotify" @change="listget">
                <el-checkbox disabled>短信通知</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="scope.row.emailNotify" @change="listge">
                <el-checkbox>邮件通知</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="scope.row.weChatNotify" @change="listg">
                <el-checkbox>微信通知</el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="文件">
          <template slot-scope="scope">
            <span v-if="scope.row.contractMaterial==null">点击查看</span>
            <div v-else>
              <a
                :href="scope.row.contractMaterial==null?null:scope.row.contractMaterial.fullPath"
                target="_blank"
              >点击查看</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="data" label="操作">
          <template slot-scope="scope">
            <div>
              <span
                style="color:#409EFF;cursor:pointer"
                v-if="scope.row.signStatus==2 || scope.row.signStatus==1"
                @click="cancel(scope.$index,scope.row)"
              >取消</span>
              <span
                style="color:#409EFF;cursor:pointer"
                v-if="scope.row.checkTime == null"
                @click="sign(scope.$index,scope.row)"
              >签署</span>
              <span
                style="color:#409EFF;cursor:pointer"
                v-if="scope.row.signStatus==1"
                @click="Launch(scope.$index,scope.row)"
              >发起</span>
              <span
                style="color:#409EFF;cursor:pointer"
                v-if="scope.row.signStatus!=3"
                @click="dele(scope.$index,scope.row)"
              >删除</span>
              <span
                style="color:#409EFF;cursor:pointer"
                v-if="scope.row.signStatus==4 || scope.row.signStatus==2"
                @click="Reset(scope.$index,scope.row)"
              >重置</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div align="center">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page"
          :page-size="num"
          layout="total, prev, pager, next, jumper"
          :total="questionnairecount.count"
        ></el-pagination>
      </div>
      <div>
        <el-dialog title="新增用户" :visible.sync="dialogUser" width="60%" center>
          <el-col :span="12">
            <el-autocomplete
              class="inline-input"
              v-model="name"
              :fetch-suggestions="querySearch"
              placeholder="请输入用户名"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogUser = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      subscriptionData: [],
      questionnairecount: {},
      page: 1,
      num: 4,
      dialogUser: false,
      name: "",
      roleUsers: [], //用户搜索返回的数据
      resourceShort: 0,
      resourcEmail: 0,
      resourceWeChat: 0,
      nikoName: ""
    };
  },
  methods: {
    //多选
    listget(p) {
      if (p == true) {
        this.resourceShort = 1;
      } else {
        this.resourceShort = 0;
      }
    },
    listge(p) {
      if (p == true) {
        this.resourcEmail = 1;
      } else {
        this.resourcEmail = 0;
      }
    },
    listg(p) {
      if (p == true) {
        this.resourceWeChat = 1;
      } else {
        this.resourceWeChat = 0;
      }
    },
    //返回上一页
    go() {
      this.$router.go(-1);
    },
    //分页查询，数据
    getSubscriptionData() {
      let data = {
        contractId: this.$route.query.data.id,
        pageSize: this.num,
        pageIndex: this.page
      };
      ajax.authPost.bind(this)(
        "/api/Management/Query/UserContract",
        data,
        res => {
          this.subscriptionData = res.data.data.list;
          this.questionnairecount = res.data.data.page;
        }
      );
    },
    //新增用户
    addUser() {
      let data = {
        userId: this.userid,
        contractId: this.$route.query.data.id
      };
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Sign/Add",
        data,
        res => {
          this.dialogUser = false;
          this.getSubscriptionData();
        }
      );
    },
    //模糊搜索选中input
    handleSelect(item) {
      this.userid = item.id;
    },
    //搜索
    handleIconClick() {
      let data = {
        userName: this.nikoName,
        contractId: this.$route.query.data.id,
        pageSize: this.num,
        pageIndex: this.page
      };
      ajax.authPost.bind(this)(
        "/api/Management/Query/UserContract",
        data,
        res => {
          this.subscriptionData = res.data.data.list;
          this.questionnairecount = res.data.data.page;
        }
      );
    },
    //  模糊搜索
    querySearch(queryString, cb) {
      ajax.authGet.bind(this)(
        "/api/Management/Contract/GetUserByNameLike?name=" + queryString,
        res => {
          if (res.data.code == 200) {
            var array = res.data.data.map(m => {
              return { value: m.nickName + "(" + m.name + ")", id: m.id };
            });
            // console.log(res);return
            this.roleUsers.splice(0);
            for (var i = 0; i < array.length && i < 6; i++) {
              this.roleUsers.push(array[i]);
            }
            cb(this.roleUsers);
          } else {
            cb([]);
          }
        }
      );
      return;
    },
    //取消
    cancel(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Sign/Cancel/" + row.id,
        res => {
          this.getSubscriptionData();
        }
      );
    },
    //签署
    sign(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Sign/Administrator?id=" + row.id,
        res => {
          this.getSubscriptionData();
        }
      );
    },
    //发起
    Launch(index, row) {
      let data = {
        id: row.id,
        smsNotify: 0,
        emailNotify: this.resourcEmail,
        weChatNotify: this.resourceWeChat
      };
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Sign/Down",
        data,
        res => {
          this.getSubscriptionData();
          this.$message({
            message: "发起签约成功",
            type: "success"
          });
        }
      );
    },
    //删除
    dele(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Sign/Remove/" + row.id,
        res => {
          this.getSubscriptionData();
        }
      );
    },
    // 重置
    Reset(index, row) {
      ajax.authPost.bind(this)(
        "/api/Management/Contract/Sign/Reset/" + row.id,
        res => {
          this.getSubscriptionData();
        }
      );
    },
    //每页显示数据量变更
    handleSizeChange(val) {
      this.num = val;
      this.getSubscriptionData();
    },
    //页码变更
    handleCurrentChange(val) {
      this.page = val;
      this.getSubscriptionData();
    }
  },
  mounted() {
    this.getSubscriptionData();
  }
};
</script>

<style lang="less" scoped>
.sign_contract {
  .sign_title {
    height: 50px;
    line-height: 40px;
    display: flex;
  }
  .Risk_data {
    .Risk_count {
      padding-top: 10px;
      /deep/.el-input {
        width: 35%;
      }
    }
  }
}
</style>