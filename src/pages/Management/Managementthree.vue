<template>
  <div class="jurdiction">
    <div class="jurdic-title">权限管理</div>
    <div class="jurdic-list">
      <el-tabs type="border-card">
        <el-tab-pane label="角色管理" style="overflow: scroll;">
          <!-- 角色列表 -->
          <div class="jurdic-bor">
            <div class="jurdic-zuh">
              <span>角色列表</span>
              <span style="font-size:14px">(<Icon type="ios-person-add" size="18" />管理员)</span>
              <el-input
                placeholder="请输入角色名称查找"
                prefix-icon="el-icon-search"
                v-model="InputRole"
                @keyup.enter.native="searchInputRole"
              ></el-input>
              <div class="jurdic-name">
                <div class="jurdic-qiez" v-for="item in getAllData" :key="item.id">
                  <span @click="ChangeRadio($event,item)" style="cursor:pointer">{{item.name}}</span>
                  <Icon
                    type="ios-trash"
                    style="float:right;line-height: 30px;cursor:pointer"
                    @click.stop="del"
                    color="red"
                    size="22"
                  />
                  <Icon
                    type="ios-create-outline"
                    style="float:right;line-height: 30px;cursor:pointer"
                    @click.stop="edit($event,item)"
                    size="20"
                  />
                  <Icon type="ios-person-add" style="float:right;line-height: 30px;" size="18" v-if="item.isAdmin==1"/>
                  <!-- <span style="float:right;line-height: 30px;">{{item.isAdmin}}</span> -->
                  <!-- 确认删除 -->
                  <el-dialog
                    title="提示"
                    :visible.sync="editNewroleDel"
                    :close-on-click-modal="true"
                    :append-to-body="true"
                    width="30%"
                    center
                  >
                    <span>确定删除吗？</span>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click.native="editNewroleDel = false">取消</el-button>
                      <el-button type="primary" @click.native="delSubmit($event,item)">确定</el-button>
                    </div>
                  </el-dialog>
                </div>
              </div>
              <div class="tian" @click="editFormVisible=true">
                <el-button type="primary" size="small">添加角色</el-button>
              </div>
              <!-- 新增角色 -->
              <el-dialog
                title="新增角色"
                :visible.sync="editFormVisible"
                :close-on-click-modal="true"
                :append-to-body="true"
                width="30%"
              >
                <!--//editForm表单提交的数据-->
                <el-form :model="editForm" label-width="80px" ref="editForm">
                  <el-form-item label="角色名称:" prop="navs">
                    <el-input
                      v-model="editForm.navs"
                      placeholder="请输入角色名称"
                      @keyup.enter.native="getpush"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="选择身份:" prop="radio">
                    <template>
                      <el-radio v-model="radio" label="1">管理员</el-radio>
                      <el-radio v-model="radio" label="0">普通用户</el-radio>
                    </template>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click.native="editFormVisible = false">取消</el-button>
                  <el-button type="primary" @click.native="getpush">提交</el-button>
                </div>
              </el-dialog>
              <!-- 修改角色信息 -->
              <el-dialog
                title="修改角色信息"
                :visible.sync="editFormEdit"
                :close-on-click-modal="true"
                :append-to-body="true"
                width="30%"
              >
                <!--//editForm表单提交的数据-->
                <el-form :model="editForm" label-width="80px" ref="editForm">
                  <el-form-item label="角色名称:" prop="navs">
                    <el-input
                      v-model="editForm.edit"
                      placeholder="请输入角色名称"
                      @keyup.enter.native="getEdit"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="选择身份:" prop="radioEdit">
                    <template>
                      <el-radio v-model="radioEdit" label="1">管理员</el-radio>
                      <el-radio v-model="radioEdit" label="0">普通用户</el-radio>
                    </template>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click.native="editFormEdit = false">取消</el-button>
                  <el-button type="primary" @click.native="getEdit">提交</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
          <!-- 用户人员 -->
          <div class="jurdic-bor" v-show="personnel">
            <div class="jurdic-zuh">
              <span>用户人员</span>
              <el-input
                placeholder="请输入用户名查找"
                prefix-icon="el-icon-search"
                v-model="inputpersonnelRole"
              ></el-input>
              <div class="jurdic-name">
                <div
                  class="jurdic-qiez"
                  @click="pers($event,item)"
                  v-for="item in search(inputpersonnelRole)"
                  :key="item.id"
                >
                  <span>{{item.nickName}}({{item.name}})</span>
                  <Icon
                    type="ios-trash"
                    style="float:right;line-height: 30px;"
                    @click.stop="delUser($event,item)"
                    color="red"
                    size="22"
                  />
                </div>
              </div>
              <div class="tian" @click="editFormUser=true">
                <el-button type="primary" size="small">添加用户</el-button>
              </div>
              <!-- 新增用户 -->
              <el-dialog
                title="新增用户"
                :visible.sync="editFormUser"
                :close-on-click-modal="true"
                :append-to-body="true"
                width="30%"
              >
                <!--//editForm表单提交的数据-->
                <el-col :span="12">
                  <el-autocomplete
                    class="inline-input"
                    v-model="roleUser.user"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入用户名"
                    :trigger-on-focus="false"
                    :popper-append-to-body="false"
                    @select="handleSelect"
                  ></el-autocomplete>
                </el-col>
                <div slot="footer" class="dialog-footer">
                  <el-button @click.native="editFormUser = false">取消</el-button>
                  <el-button type="primary" @click.native="getAddUser">提交</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
          <!-- 权限设置 -->
          <div class="jurdic-bor" v-show="diction">
            <div class="jurdic-zuh">
              <span>权限设置</span>
              <div class="jurdic-name">
                <el-tree
                  :data="getRoleList"
                  show-checkbox
                  node-key="label"
                  :props="defaultProps"
                  ref="tree"
                ></el-tree>
              </div>
              <div class="tian">
                <el-button type="primary" @click="getCheckedAdd">添加</el-button>
                <el-button type="primary" @click="getCheckedNodes">提交</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- 人员管理 -->
        <el-tab-pane label="人员管理">
          <!-- 用户人员 -->
          <div class="jurdic-bor">
            <div class="jurdic-zuh">
              <div>用户人员</div>
              <el-col :span="12">
                <el-autocomplete
                  class="inline-input"
                  v-model="roleUser.user"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入用户名"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-col>
              <div class="jurdic-name">
                <div class="jurdic-qiez">
                  <span @click="yongH">{{userValue}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 角色权限 -->
          <div class="jurdic-bor" v-show="quanX">
            <div class="jurdic-zuh">
              <div>角色权限</div>
              <div class="jurdic-name">
                <div class="jurdic-qiez" v-for="item in roleName" :key="item.id">
                  <span>{{item.name}}</span>
                  <Icon
                    type="ios-trash"
                    style="float:right;line-height: 30px;"
                    @click.stop="delroleName($event,item)"
                    color="red"
                    size="22"
                  />
                </div>
              </div>
              <div class="tian" @click="editNewrole=true">
                <el-button type="primary" size="small">添加角色</el-button>
              </div>
            </div>
          </div>
          <!-- 新增用户角色 -->
          <el-dialog
            title="新增用户角色"
            :visible.sync="editNewrole"
            :close-on-click-modal="true"
            :append-to-body="true"
            width="30%"
          >
            <!--//editForm表单提交的数据-->
            <el-col :span="12">
              <el-autocomplete
                class="inline-input"
                v-model="roleUser.Newrole"
                :fetch-suggestions="queryNewrole"
                placeholder="请输入用户名"
                :trigger-on-focus="false"
                @select="handleNewrole"
              ></el-autocomplete>
            </el-col>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="editNewrole = false">取消</el-button>
              <el-button type="primary" @click.native="getAddNewrole">提交</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      editNewroleDel: false,
      inputpersonnelRole: "",
      getAllData: [], //所有角色信息
      getRole: [], //角色人员
      getRoleList: [], //权限列表
      roleUsers: [], //用户搜索返回的数据
      userid: "", //选中用户的id
      RoleName: "", //搜索角色名称
      InputRole: "", //角色名称
      Inputpersonnel: "", //角色人员
      editFormVisible: false, //添加角色
      editFormUser: false, //添加用户
      editFormEdit: false, //修改角色信息
      editNewrole: false, //新增用户角色
      editForm: {
        //角色名称
        navs: "",
        edit: ""
      },
      roleUser: {
        user: "",
        Newrole: "" //模糊搜索用户角色
      },
      personnel: false, //角色人员隐藏列表
      diction: false, //权限管理隐藏列表
      defaultProps: {
        children: "children",
        label: "label"
      },
      nameRole: [],
      radio: "", //添加角色信息单选
      radioEdit: "", //修改角色信息单选
      getRadio: [],
      userValue: "", //用户名
      quanX: false, //人员管理角色权限列表
      roleName: [], //人员管理角色权限列表数据
      roleId: "",
      isAdmin: ""
    };
  },
  methods: {
    //  模糊搜索
    querySearch(queryString, cb) {
      ajax.authGet.bind(this)(
        "/api/System/Role/GetUserByNameLike?name=" + queryString,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            var array = res.data.data.map(m => {
              return { value: m.nickName + "(" + m.name + ")", id: m.id };
            });
            // console.log(array);
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
    //模糊搜索选中input
    handleSelect(item) {
      this.userid = item.id;
      this.userValue = item.value;
    },
    //添加人员管理下的角色模糊搜索
    queryNewrole(queryString, cb) {
      // console.log(queryString);
      ajax.authGet.bind(this)(
        "/api/System/Role/FindRoleByNameLike?name=" + queryString,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            var array = res.data.data.map(m => {
              return { value: m.name, id: m.id };
            });
            // console.log(array);
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
    //添加人员管理下的角色模糊搜索
    handleNewrole(item) {
      this.isAdmin = item.id;
    },
    //添加人员管理下的角色
    getAddNewrole() {
      ajax.authPost.bind(this)(
        "/api/System/Role/AddUserRole?userid=" +
          this.userid +
          "&roleid=" +
          this.isAdmin,
        res => {
          console.log(res);
          this.roleUser.user = "";
          this.yongH();
        }
      );
      this.editNewrole = false;
    },
    //用户管理下的角色信息列表
    yongH() {
      this.quanX = true;
      ajax.authGet.bind(this)(
        "/api/System/Role/GetRoleByUserId?userid=" + this.userid,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.roleName = res.data.data;
          }
        }
      );
    },
    //添加用户
    getAddUser() {
      ajax.authPost.bind(this)(
        "/api/System/Role/AddUserRole?userid=" +
          this.userid +
          "&roleid=" +
          this.roleId,
        res => {
          console.log(res);
          this.roleUser.user = "";
          this.gtepublic();
        }
      );
      this.editFormUser = false;
    },
    //获取所有角色信息
    getAll() {
      ajax.authGet.bind(this)("/api/System/Role", res => {
        console.log(res);
        if (res.data.code == 200) {
          this.getAllData = res.data.data;
        }
      });
    },
    //搜索角色信息
    searchInputRole() {
      ajax.authGet.bind(this)(
        "/api/System/Role/FindRoleByNameLike?name=" + this.InputRole,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getAllData = res.data.data;
          }
        }
      );
    },
    //搜索用户人员
    search(inputpersonnelRole) {
      var arr = this.getRole.filter(item => {
        var a = item.name;
        var b = item.nickName;
        var content = a + b;
        if (content.includes(inputpersonnelRole)) {
          return true;
        }
      });
      return arr;
    },
    //提交新增角色
    getpush() {
      let data = { name: this.editForm.navs, isAdmin: this.radio };
      ajax.authPost.bind(this)("/api/System/Role/Add", data, res => {
        console.log(res);
        this.editForm.navs = this.radio = "";
        this.getAll();
        this.yongH();
        this.editFormVisible = !this.editFormVisible;
        if (res.data.code == 400) {
          let Tips = res.data.message;
          this.$message(Tips);
        }
      });
    },
    //删除角色
    delSubmit(e, index) {
      ajax.authPost.bind(this)(
        "/api/System/Role/Delete?id=" + index.id,
        res => {
          this.getAll();
          this.editNewroleDel = false;
        }
      );
    },
    del() {
      this.editNewroleDel = true;
    },
    //人员管理下的删除角色
    delroleName(e, index) {
      ajax.authPost.bind(this)(
        "/api/System/Role/Delete?id=" + index.id,
        res => {
          console.log(res);
          this.yongH();
        }
      );
    },
    //编辑
    edit(e, index) {
      this.editFormEdit = !this.editFormEdit;
      this.roleId = index.id;
      this.editForm.edit = index.name;
      this.radioEdit = index.isAdmin.toString();
      console.log(index.isAdmin);
    },
    //提交修改角色
    getEdit() {
      let data = {
        id: this.roleId,
        name: this.editForm.edit,
        isAdmin: this.radioEdit
      };
      ajax.authPost.bind(this)("/api/System/Role/Update", data, res => {
        console.log(res);
        this.editForm.edit = this.radioEdit = "";
        this.editFormEdit = false;
        this.getAll();
      });
    },
    //删除用户
    delUser(e, index) {
      ajax.authPost.bind(this)(
        "/api/System/Role/DeleteUserRole?userid=" +
          index.id +
          "&roleid=" +
          this.roleId +
          "",
        res => {
          console.log(res);
          this.gtepublic();
        }
      );
    },
    //右侧用户人员框
    ChangeRadio(e, index) {
      this.personnel = true;
      this.roleId = index.id;
      this.gtepublic();
    },
    //  用户人员
    gtepublic(e, index) {
      ajax.authGet.bind(this)(
        "/api/System/Role/GetUserAccountByRole/" + this.roleId,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getRole = res.data.data;
          }
        }
      );
    },
    //根据id获取权限
    pers(e, index) {
      this.diction = true;
      ajax.authGet.bind(this)(
        "/api/System/Role/GetUserPermissions?userid=" + index.id,
        res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getRoleList = res.data.data;
          }
        }
      );
    },
    //添加权限信息
    getCheckedAdd() {
      let data = {};
      ajax.authPost.bind(this)("/api/System/Role/AddRolePermission");
    },
    //提交权限设置
    getCheckedNodes() {
      this.personnel = false;
      this.diction = false;
      let list = this.$refs.tree.getCheckedNodes();
      console.log(list);
    }
  },
  mounted() {
    this.getAll(); //获取所有角色信息
    this.roleUsers = [];
  }
};
</script>

<style lang="less" scoped>
.jurdiction {
  .jurdic-title {
    height: 30px;
  }
  .jurdic-list {
    width: 100%;
    height: 100%;
    padding: 20px;
    border-bottom: 20px solid #f0f1f7;
    background: #ffffff;
    /deep/.el-tab-pane {
      display: flex;
    }
    .jurdic-bor {
      height: 100%;
      background: #f0f1f7;
      margin-right: 15px;
      .jurdic-zuh {
        width: 300px;
        padding: 10px;
        /deep/.el-col-12 {
          float: none;
        }
        /deep/.el-icon-search {
          width: 75%;
        }
        .jurdic-name {
          height: 300px;
          overflow: scroll;
          margin-top: 10px;
          background: #fff;
          .jurdic-qiez {
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background: rgb(41, 157, 235);
            border-bottom: 1px solid #ffffff;
          }
        }
        .tian {
          button {
            float: right;
          }
        }
      }
    }
  } 
}
/deep/.el-autocomplete-suggestion {
  z-index: 9999 !important;
}
</style>
