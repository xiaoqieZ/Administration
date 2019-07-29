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
                    <transition name="fade" >
                        <span class="title-txt" v-show="!isShow" >COINRISE后台管理</span>
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
                    active-text-color="#fff"
                    router
                    :class="{ 'keynav':isShow }"
                    :default-opened="opened"
                    >
                     <!-- 系统环境 -->
                        <div
                        class="grou-title"
                        style="margin-top:0;"
                        onselectstart="return false;"
                        >{{ !isShow?'系统环境':'系统' }}</div>
                            <!-- 币种资料与参数配置 -->
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
                                >币种资料与参数配置</span>
                                <i
                                class="nav-bar-comicon"
                                v-show="!isShow"
                                :class="[ High.CParameter ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
                                ></i>
                            </template>
                            <div v-show="!isShow">
                                <el-menu-item index="/MainHeader/CParameter/CurrencyData">
                                <span class="mr-right-18">·</span>
                                币种资料管理
                                </el-menu-item>
                                <el-menu-item index="/MainHeader/CParameter/CTAllocation">
                                <span class="mr-right-18">·</span>
                                币种交易参数配置
                                </el-menu-item>
                                <el-menu-item index="/MainHeader/CParameter/CCTAllocation">
                                <span class="mr-right-18">·</span>
                                币币交易参数配置
                                </el-menu-item>
                            </div>
                            </el-submenu>
                            <!-- 数据字典 -->
                            <el-submenu index="DataDitionary" onselectstart="return false;">
                              <template slot="title">
                                <i 
                                class="nav-open-icon"
                                :class="[ High.DataDitionary ? 'nav-open-icon2-1' : 'nav-open-icon2-2' ]"
                                ></i>
                                <span
                                v-show="!isShow"
                                :style="{'color': High.DataDitionary ? '#9A9AB0': '#FFFFFF'}"
                                >数据字典</span>
                                <i
                                class="nav-bar-comicon"
                                v-show="!isShow"
                                :class="[High.DataDitionary ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
                                ></i>
                              </template>
                              <div v-show="!isShow">
                                <el-menu-item index="/MainHeader/DataDitionary/BankData">
                                  <span class="mr-right-18">.</span>
                                  银行数据字典
                                </el-menu-item>
                              </div>
                            </el-submenu>

                    <!-- 业务相关 -->
                          <div class="grou-title" onselectstart="return false;">{{ isShow?'业务':'业务相关' }}</div>

                          <!-- 用户管理 -->
                          <el-submenu index="UserManage" onselectstart="return false;">
                            <template slot="title">
                              <i
                              class="nav-open-icon"
                              :style="{'background' : High.UserManage ? 'url(../../static/img/uManage.png)' : 'url(../../static/img/uManagexz.png)'}"
                              ></i>
                              <span
                                v-show="!isShow"
                                :style="{'color': High.UserManage ? '#9A9AB0': '#FFFFFF'}"
                              >用户管理</span>
                              <i
                                class="nav-bar-comicon"
                                v-show="!isShow"
                                :class="[ High.UserManage ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
                                ></i>
                            </template>
                              <div v-show="!isShow">
                                <el-menu-item index="/MainHeader/UserManage/AccountManage">
                                  <span class="mr-right-18">·</span>
                                  用户信息管理
                                </el-menu-item>
                                <el-menu-item index="/MainHeader/UserManage/UserFun">
                                  <span class="mr-right-18">·</span>
                                  用户记录查看
                                </el-menu-item>
                                <el-menu-item index="/MainHeader/UserManage/UserInfo">
                                  <span class="mr-right-18">·</span>
                                  用户功能管理
                                </el-menu-item>
                                <el-menu-item index="/MainHeader/UserManage/UserRecord">
                                  <span class="mr-right-18">·</span>
                                  货币账户管理
                                </el-menu-item>
                            </div>
                          </el-submenu>
                          <!-- 推荐会员管理 -->
                          <el-submenu index="MemberManage" onselectstart="return false;">
                            <template slot="title">
                              <i
                              class="nav-open-icon"
                              :style="{'background' : High.MemberManage ? 'url(../../static/img/member.png)' : 'url(../../static/img/memberxz.png)'}"
                              ></i>
                              <span
                              v-show="!isShow"
                              :style="{'color':High.MemberManage ?  '#9A9AB0': '#FFFFFF'}"
                              >推荐会员管理</span>
                              <i
                              class="nav-bar-comicon"
                              v-show="!isShow"
                              :class="[ High.MemberManage ? 'nav-bar-bArrowsicon' : 'nav-bar-rArrowsicon' ] "
                              ></i>
                            </template>
                             <div v-show="!isShow">
                                <el-menu-item index="/MainHeader/MemberManage/Aparameters">
                                  <span class="mr-right-18">·</span>
                                  佣金参数配置
                                </el-menu-item>
                                <el-menu-item index="/MainHeader/MemberManage/Uinquiry">
                                  <span class="mr-right-18">·</span>
                                  用户佣金查询
                                </el-menu-item>
                                <el-menu-item index="/MainHeader/MemberManage/Udetails">
                                  <span class="mr-right-18">·</span>
                                  用户明细查询
                                </el-menu-item>
                            </div>
                          </el-submenu>
                 </el-menu>
            </el-col>
        </div>
        <router-view style="padding:0 20px 0 68px;font-size:16px;box-sizing:border-box;"></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isShow: false,
            rouPath: null,
            opened: ["/CurrencyData"], //设置侧边导航默认打开的菜单
             High: {
                CParameter: true, //币种参数配置
                DataDitionary: true, //数据字典
                UserManage: true, //用户管理
                MemberManage: true, //推荐会员管理
                DealManage: true, //委托交易管理
                C2C: true, //C2C功能
                CBHistory: true, //充币历史记录
                DrawMoney: true, //提币相关
                StandingBook: true, //交易所台账管理
                Banner: true, //banner管理
                NewsArticles: true, //资讯文章管理
                Notice: true, //公告管理
                Risk: true //风险
            },
            isUnfold: {
                //是否展开
                up: new Set()
            },
        }
    },
    methods:{
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
      // this.singleMenu.forEach(ele => {
      //   //所有在this.singleMenu中的都是无法展开的单个菜单
      //   // console.log(ele)
      //   if (!(indexOne == ele)) {
      //     //当菜单激活时,当前激活的菜单不是单个菜单时,就把高亮的单个菜单从高亮集合中剔除
      //     this.isUnfold.up.delete(ele);
      //     this.High[ele] = true;
      //   }
      // });
    },
    },
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
}
</script>
<style lang="less" scoped>
.c-nav-show {
  ::-webkit-scrollbar{
  display:none;
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
    width:70px;
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
  // 箭头
    .nav-bar-comicon {
    display: block;
    float: right;
  }
    .nav-bar-bArrowsicon {
    margin-top: 14px;
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
/deep/ .el-submenu__title i{
  display: none
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
/deep/.el-menu--inline{
  padding-left: 20px;
}

</style>


