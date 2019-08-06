<template>
  <div style="height:100%;background:#F0F1F7">
    <div @mouseenter="hoverNav" @mouseleave="leaveNav">
      <el-col
        :span="12"
        class="c-nav-show"
        :class="[ isShow?'tr-nav':'tr-nav-alt' ]"
        style="height:100%;"
      >
        <div class="nav-bar-title" onselectstart="return false;">
          <transition name="fade">
            <span class="title-txt" v-show="!isShow">COINRISE后台管理</span>
          </transition>
          <span
            class="title-ico"
            @click="tabShow"
            :style="{ 'background' : isShow ? 'url(../../static/img/offUnfold.png) no-repeat center' : 'url(../../static/img/tUnfold.png) no-repeat center'}"
          ></span>
        </div>
        <el-menu
          @close="handleClose"
          @open="handleOpen"
          @select="handleSelect"
          :default-active="this.rouPath"
          class="el-menu-vertical-demo"
          background-color="#1D1C29"
          text-color="#9A9AB0"
          active-text-color="#FFFFFF"
          router
          :class="{ 'keynav':isShow }"
          :default-opened="opened"
        > 
        <vue-scroll :ops="ops">
        <!-- 遇到的坑：1.不配置路由的话，不会有高亮。2.配置类名时，类名必须与路由名一致，图标才能有高亮。3.不需要展开的导航菜单需要再methods里面重新配置。 -->
          <!-- 首页 -->         
           <el-menu-item
              index="/MainHeader/Homepage/Homepage"
              class="issingleMenu"
              style="user-select:none"
            >
              <i
                class="nav-open-icon"
                :class="[High.Homepage ? 'qi-ren-a' : 'shi-zhen-deqi']"
              ></i>
              <span 
              onselectstart="return false;"
              v-show="!isShow"
              >首页</span>
            </el-menu-item>
          <div
            class="grou-title"
            
            onselectstart="return false;"
          >{{ !isShow?'系统环境':'系统' }}</div>
          <!-- 适当性管理 -->
          <el-submenu index="CParameter" onselectstart="return false;">
            <template slot="title">
              <i
                class="nav-open-icon"
                :class="[ High.CParameter ? 'nav-open-icon1' : 'nav-open-icon1-1' ]"
              ></i>
              <span
                onselectstart="return false;"
                v-show="!isShow"
                :style="{ 'color' : High.CParameter ? '#9A9AB0': '#FFFFFF' }"
              >适当性管理</span>
              <i
                v-show="!isShow"
                class="nav-bar-comicon"
                :class="[ High.CParameter ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
              ></i>
            </template>
            <div v-show="!isShow">
              <el-menu-item index="/MainHeader/CParameter/CurrencyData">
                <span class="mr-right-18">·</span>
                客户信息
              </el-menu-item>
              <el-menu-item index="/MainHeader/CParameter/CTAllocation">
                <span class="mr-right-18">·</span>
                客户审核
              </el-menu-item>
              <el-menu-item index="/MainHeader/CParameter/CCTAllocation">
                <span class="mr-right-18">·</span>
                投资者份额
              </el-menu-item>
              <el-menu-item index="/MainHeader/CParameter/CCCtallocation">
                <span class="mr-right-18">·</span>
                投资者导入
              </el-menu-item>
              <el-menu-item index="/MainHeader/CParameter/CCCCtallocation">
                <span class="mr-right-18">·</span>
                理财顾问
              </el-menu-item>
              <el-menu-item index="/MainHeader/CParameter/CCCCCtallocation">
                <span class="mr-right-18">·</span>
                智能自查
              </el-menu-item>
            </div>
          </el-submenu>
          <!-- 信息披露 -->
          <el-submenu index="DataDitionary" onselectstart="return false;">
            <template slot="title">
              <i
                class="nav-open-icon"
                :class="[ High.DataDitionary ? 'nav-open-icon2-1' : 'nav-open-icon2-2' ]"
              ></i>
              <span
                v-show="!isShow"
                :style="{'color': High.DataDitionary ? '#9A9AB0': '#FFFFFF'}"
              >信息披露</span>
              <i
                class="nav-bar-comicon"
                v-show="!isShow"
                :class="[High.DataDitionary ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
              ></i>
            </template>
            <div v-show="!isShow">
              <el-menu-item index="/MainHeader/DataDitionary/BankData">
                <span class="mr-right-18">.</span>
                产品列表
              </el-menu-item>
              <el-menu-item index="/MainHeader/DataDitionary/BbankData">
                <span class="mr-right-18">.</span>
                日历提醒
              </el-menu-item>
            </div>
          </el-submenu>

          <!-- 业务相关 -->
          <div class="grou-title" onselectstart="return false;">{{ isShow ? '业务':'业务相关' }}</div>

          <!-- 电子签约 -->
          <el-submenu index="UserManage" onselectstart="return false;">
            <template slot="title">
              <i
                class="nav-open-icon"
                :style="{'background' : High.UserManage ? 'url(../../static/img/uManage.png)' : 'url(../../static/img/uManagexz.png)'}"
              ></i>
              <span
              v-show="!isShow"
              :style="{'color': High.UserManage ? '#9A9AB0': '#FFFFFF'}"
              >
              电子签约</span>
              <i
                v-show="!isShow"
                class="nav-bar-comicon"
                :class="[ High.UserManage ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
              ></i>
            </template>
            <div v-show="!isShow">
              <el-menu-item index="/MainHeader/UserManage/AccountManage">
                <span class="mr-right-18">·</span>
                去签约
              </el-menu-item>
              <el-menu-item index="/MainHeader/UserManage/UserFun">
                <span class="mr-right-18">·</span>
                基金合同
              </el-menu-item>
              <el-menu-item index="/MainHeader/UserManage/UserInfo">
                <span class="mr-right-18">·</span>
                公文文件
              </el-menu-item>
              <el-menu-item index="/MainHeader/UserManage/UserRecord">
                <span class="mr-right-18">·</span>
                账户设置
              </el-menu-item>
            </div>
          </el-submenu>
          <!-- 备案材料 -->
          <el-submenu index="MemberManage" onselectstart="return false;">
            <template slot="title">
              <i
                class="nav-open-icon"
                :style="{'background' : High.MemberManage ? 'url(../../static/img/member.png)' : 'url(../../static/img/memberxz.png)'}"
              ></i>
              <span
                v-show="!isShow"
                :style="{'color':High.MemberManage ?  '#9A9AB0': '#FFFFFF'}"
              >备案材料</span>
              <i
                class="nav-bar-comicon"
                v-show="!isShow"
                :class="[ High.MemberManage ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
              ></i>
            </template>
            <div v-show="!isShow">
              <el-menu-item index="/MainHeader/MemberManage/Aparameters">
                <span class="mr-right-18">·</span>
                下载中心
              </el-menu-item>
            </div>
          </el-submenu>
          <!-- 推送信息 -->
          <el-submenu index="Pushmessages" onselectstart="return false;">
            <template slot="title">
              <i
                class="nav-open-icon"
                :style="{'background' : High.Pushmessages ? 'url(../../static/img/c2c.png)' : 'url(../../static/img/c2cxz.png)'}"
              ></i>
              <span
                v-show="!isShow"
                :style="{'color':High.Pushmessages ?  '#9A9AB0': '#FFFFFF'}"
              >推送消息</span>
              <i
                class="nav-bar-comicon"
                v-show="!isShow"
                :class="[ High.Pushmessages ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
              ></i>
            </template>
            <div v-show="!isShow">
              <el-menu-item index="/MainHeader/Pushmessages/Pushmessage">
                <span class="mr-right-18">·</span>
                发送信息
              </el-menu-item>
              <el-menu-item index="/MainHeader/Pushmessages/Pushmessagetow">
                <span class="mr-right-18">·</span>
                接收信息
              </el-menu-item>
              <el-menu-item index="/MainHeader/Pushmessages/Pushmessagethree">
                <span class="mr-right-18">·</span>
                模板信息
              </el-menu-item>
            </div>
          </el-submenu>
          <!-- 系统管理 -->
          <el-submenu index="Managements" onselectstart="return false;">
            <template slot="title">
              <i
                class="nav-open-icon"
                :style="{'background' : High.Managements ? 'url(../../static/img/book.png)' : 'url(../../static/img/bookxz.png)'}"
              ></i>
              <span
                v-show="!isShow"
                :style="{'color':High.Managements ?  '#9A9AB0': '#FFFFFF'}"
              >系统管理</span>
              <i
                class="nav-bar-comicon"
                v-show="!isShow"
                :class="[ High.Managements ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
              ></i>
            </template>
            <div v-show="!isShow">
              <el-menu-item index="/MainHeader/Managements/Managementone">
                <span class="mr-right-18">·</span>
                页面设置
              </el-menu-item>
              <el-menu-item index="/MainHeader/Managements/Managementtow">
                <span class="mr-right-18">·</span>
                投资者统计
              </el-menu-item>
              <el-menu-item index="/MainHeader/Managements/Managementthree">
                <span class="mr-right-18">·</span>
                问卷管理
              </el-menu-item>
              <el-menu-item index="/MainHeader/Managements/Managementfour">
                <span class="mr-right-18">·</span>
                权限管理
              </el-menu-item>
              <el-menu-item index="/MainHeader/Managements/Managementfive">
                <span class="mr-right-18">·</span>
                使用统计
              </el-menu-item>
              <el-menu-item index="/MainHeader/Managements/Managementsix">
                <span class="mr-right-18">·</span>
                同步设置
              </el-menu-item>
              <el-menu-item index="/MainHeader/Managements/Managementseven">
                <span class="mr-right-18">·</span>
                认证管理
              </el-menu-item>
            </div>
          </el-submenu>
        </vue-scroll>
        </el-menu>
        <div class="listtitle">
        <div
        :class="[isShow?'lFFF':'listtime']"
        >
          <i class="el-icon-phone"></i>
          <span>{{isShow?'咨询':'联系电话(工作时间：9：30-16：30)'}}</span>
          <p v-show="!isShow">020-3463706-1111</p>
        </div>
        <div class="listname">
          <span>碳链科技</span>
        </div>
      </div>
      </el-col>
    </div>
    <router-view :class="[isShow?'bossyone':'bossytow']"></router-view>
  </div>
</template>

<script>
import vuescroll from 'vuescroll';
export default {
  data() {
    return {
      isShow: false,
      rouPath: null,
      opened: ["/CurrencyData"], //设置侧边导航默认打开的菜单
      High: {
        CParameter: true, //适当性管理
        DataDitionary: true, //信息披露
        UserManage: true, //电子签约
        MemberManage: true, //备案材料
        Managements: true, //系统管理
        Pushmessages: true, //推送消息
        Homepage: true, //首页
      },
      singleMenu: ["Homepage"], //不需要展开的菜单
      isUnfold: {
        //是否展开
        up: new Set()
      },
      ops: {
        bar: {
          size: "4px",
          background: "#ffffff"
        }
      },
    }
  },
  methods: {
    //鼠标进入
    hoverNav() {
      this.isShow = false;
    },
    //鼠标离开
    leaveNav() {
      this.isShow = true;
    },
    getPath() {
      this.rouPath = this.$route.path;
    },
    tabShow() {
      this.isShow = !this.isShow;
    },
    //导航收起的回调
    handleClose(index, indexPath) {
      for (let HighKey in this.High) {
        if (HighKey == index) {
          this.isUnfold.up.delete(HighKey);
          if (index != this.$route.path.split("/")[2]) {
            this.High[HighKey] = true;
          }
        }
      }
    },
    //导航展开的回调
    handleOpen(index, indexPath) {
      let openIndex = index.split("/")[2] ? index.split("/")[2] : indexPath;
      for (let HighKey in this.High) {
        if (openIndex == HighKey) {
          this.High[HighKey] = false;
          this.isUnfold.up.add(HighKey);
          return;
        }
      }
    },
    //当前激活的菜单
    handleSelect(index, indexPath) {
      let indexOne = indexPath[0].split("/")[2]
        ? indexPath[0].split("/")[2]
        : indexPath[0];
      for (let HighKey in this.High) {
        if (indexOne == HighKey) {
          this.High[HighKey] = false; //激活的高亮
          this.isUnfold.up.add(HighKey);

          this.isUnfold.up.forEach(ele => {
            // console.log(ele)
            //存在this.isUnfold.up中的都是已展开的菜单 需要高亮
            this.High[ele] = false;
          });
        }
        if (!this.isUnfold.up.has(HighKey)) {
          this.High[HighKey] = true;
        }
      }
      this.singleMenu.forEach(ele => {
        //所有在this.singleMenu中的都是无法展开的单个菜单
        // console.log(ele)
        if (!(indexOne == ele)) {
          //当菜单激活时,当前激活的菜单不是单个菜单时,就把高亮的单个菜单从高亮集合中剔除
          this.isUnfold.up.delete(ele);
          this.High[ele] = true;
        }
      });
    },
    
  },
  components: {
      vuescroll
    }
  //   watch: {
  //   $route() {
  //     this.getPath();
  //     this.handleSelect(null, [
  //       String(this.rouPath.split("/")[2]),
  //       String(this.rouPath)
  //     ]);
  //     this.handleOpen(this.rouPath, this.rouPath);
  //     //
  //   }
  // },
  // getPath() {
  //   this.getPath();
  //   this.handleOpen(this.rouPath);
  //   this.isdata();
  // },
};
</script>
<style lang="less" scoped>
.lFFF{
  height: 54px;
  line-height: 25px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.listtitle{
  font-size: 14px;
  color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  .listtime{
    height: 54px;
    line-height: 25px;
    background: rgba(0, 0, 0, 0.3);
    p{
      text-align: center;
      margin: 0;
    }
  }
  .listname{
    height: 35px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.el-submenu{
  padding-top: 20px;
}
.bossyone {
  padding: 0 20px 0 88px;
  font-size: 16px;
  box-sizing: border-box;
}
.bossytow {
  padding: 0 20px 0 280px;
  font-size: 16px;
  box-sizing: border-box;
}
.c-nav-show {
  ::-webkit-scrollbar {
    display: none;
  }
  width: 265px;
  height: 100%;
  font-size: 16px;
  background: #1d1c29;
  float: left;
  position: absolute;
  z-index: 999;
  overflow: hidden;
  .issingleMenu {
    height: 40px;
    line-height: 40px;
    padding: 0 25px !important;
  }
  .nav-bar-title {
    height: 50px;
    background: #1d1c29;
    box-sizing: border-box;
    padding: 25px 0 0 25px;
    margin-bottom: 58px;
    .title-txt {
      width: 144px;
      height: 16px;
      font-size: 16px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-right: 25px;
      cursor: default;
    }
    .title-ico {
      float: right;
      color: #fff;
      cursor: pointer;
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      width: 65px;
      height: 65px;
      background: url(../../static/img/tUnfold.png) no-repeat;
      background-position: center;
    }
    .title-ico:hover {
      background: url(../../static/img/hoverUnfold.png) no-repeat;
    }
  }
  .grou-title {
    margin-top: 47px;
    padding-left: 25px;
    margin-bottom: 9px;
    width: 70px;
    // height:12px;
    font-size: 12px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(154, 154, 176, 1);
    cursor: default;
  }
  .nav-open-icon {
    width: 18px;
    height: 18px;
    display: inline-block;
    margin-right: 18px;
    box-sizing: border-box;
  }
  .nav-open-icon1 {
    background: url(../../static/img/bzzl.png);
  }
  .nav-open-icon1-1 {
    background: url(../../static/img/bzzlxz.png);
  }
  .nav-open-icon2-1 {
    background: url(../../static/img/zd.png);
  }
  .nav-open-icon2-2 {
    background: url(../../static/img/zdxz.png);
  }
  .qi-ren-a{
    background: url(../../static/img/cB.png)
  }
  .shi-zhen-deqi{
    background: url(../../static/img/cBxz.png)
  }
  // 箭头
  .nav-bar-comicon {
    display: block;
    float: right;
  }
  .nav-bar-bArrowsicon {
    margin-top: 10px;
    width: 6px;
    height: 12px;
    background: url(../../static/img/rArrows.png) no-repeat;
  }
  .nav-bar-rArrowsicon {
    margin-right: 0;
    width: 12px;
    height: 6px;
    margin-top: 16px;
    background: url(../../static/img/bArrows.png) no-repeat;
  }
}
/deep/ .el-submenu__title i {
  display: none;
}
// vue动画
.fade-enter-active {
  transition: opacity 1.5s;
}
.fade-leave-active {
  transition: opacity 0.05s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
// 文字隐藏
.tr-nav {
  animation: keynav 0.3s;
  animation-fill-mode: forwards;
}
.tr-nav-alt {
  animation: altnav 0.3s;
  // animation-direction: alternate;
  animation-fill-mode: forwards;
}
@keyframes keynav {
  0% {
    width: 265px;
  }
  100% {
    width: 68px;
  }
}
@keyframes altnav {
  0% {
    width: 68px;
  }
  100% {
    width: 265px;
  }
}
.c-nav-show/deep/.el-menu--inline {
  padding-left: 20px;
}
.c-nav-show/deep/.__vuescroll {
  height: 85% !important;
}
.c-nav-show/deep/.__panel{
  margin:0 !important; 
}
/deep/.el-menu{
  height: 88%;
}
</style>


