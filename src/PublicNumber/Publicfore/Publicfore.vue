<template>
  <div class="myhome">
    <mt-header fixed title="我的">
      <mt-button slot="right" @click="dialogVisible = true">
        <Icon type="ios-warning-outline" />
      </mt-button>
    </mt-header>
    <el-dialog title="免费声明" :visible.sync="dialogVisible" width="80%">
      <span>免费声明如下：</span>
      <p>本平台所有数据为方便您查看产品的信息披露，仅供参考，不作为最终申购、赎回的法律依据。如有因为信息滞后问题与实际不符，以实际投资信息为准。</p>
      <span slot="footer" class="dialog-footer">
        <el-checkbox v-model="checked" @change="change">不再提示</el-checkbox>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="myhomettop">
      <div class="myhometimg">
        <div class="imges">
          <!-- <van-skeleton title avatar :row="3" :loading="loading" avatar-shape="square" avatar-size="80" v-if="loading==true"/>
          <img :src="userData.portrait" style="position: absolute;top: 0;" v-else/> -->
          <img :src="userData.portrait==null?'static/img/lanjiazai.png':userData.portrait" style="position: absolute;top: 0;" />
        </div>
      </div>
        <div style="padding-left: 20px;">
          <p>
          姓名：
          <span>{{userData.nickName==null?'- -':userData.nickName}}</span>
        </p>
        <p>
          手机：
          <span>{{userData.mobile==null?'- -':userData.mobile}}</span>
        </p>
        <p>
          资产：
          <span style="font-weight: 600;color:red">
            <span>{{TotalAssets}}</span>￥
          </span>
        </p>
        <p>
          类别：
          <span>{{userData.customerTypeName==null?'- -':userData.customerTypeName}}</span>
        </p>
        </div>
      </div>
    <div v-if="IsAdmin==true">
      <el-button @click.native="gos" type="primary" plain style="width:100%">
        <i class="el-icon-menu"></i>&nbsp;进入后台系统
      </el-button>
    </div>
    <!-- 信息列表 -->
    <div class="merges">
      <div class="myhometcenter">
        <div class="myhometupdey">
          <p style="font-weight: 800;">
            <i class="el-icon-s-check"></i>
            <span>投资者认定</span>
          </p>
        </div>
        <router-link to="/Publicfore/Information/Authentication">
          <div class="myhometupdey">
            <p>
              <i class="el-icon-user"></i>
              <span>实名认证</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link to="/Publicfore/Information/Assessment">
          <div class="myhometupdey">
            <p>
              <i class="el-icon-user"></i>
              <span>风险评测</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link to="/Publicfore/Information/Acquisition">
          <div class="myhometupdey">
            <p>
              <i class="el-icon-user"></i>
              <span>信息采集</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link to="/Publicfore/Information/Material">
          <div class="myhometupdey">
            <p>
              <i class="el-icon-user"></i>
              <span>证明材料</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link to="/Publicfore/Information/Conversion">
          <div class="myhometupdey" v-if="investorTypeList.investorType==2&&isQualified==true">
            <p>
              <i class="el-icon-user"></i>
              <span>投资者转化(普转专)</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
      </div>
      <!-- 交易记录 -->
      <div class="myhometcenter">
        <div class="myhometupdey">
          <p style="font-weight: 800;">
            <!-- <i class="el-icon-date"></i> -->
            <Icon type="ios-calendar" />
            <span>交易记录</span>
          </p>
        </div>
        <router-link to="/Publicfore/TransactionRecord/Reservation">
          <div class="myhometupdey">
            <p>
              <i class="el-icon-user"></i>
              <span>持仓记录</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link to="/Publicfore/TransactionRecord/Purchase">
          <div class="myhometupdey">
            <p>
              <i class="el-icon-user"></i>
              <span>购买申请记录</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link to="/Publicfore/TransactionRecord/Redeem">
          <div class="myhometupdey">
            <p>
              <i class="el-icon-user"></i>
              <span>赎回记录</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <router-link to="/Publicfore/TransactionRecord/Returnvisit">
          <div class="myhometupdey">
            <p>
              <i class="el-icon-user"></i>
              <span>回访记录</span>
            </p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </router-link>
        <div class="myhometupdey">
          <p>
            <i class="el-icon-document-copy"></i>
            <span>电子合同</span>
          </p>
          <p>
            <router-link to="/Publicfore/TransactionRecord/Identification">
              <span v-if="countData!=0">待签署合同{{countData}}份</span> 
              <el-button type="warning" size="mini">去签署</el-button>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <tabbar-home></tabbar-home>
  </div>
</template>

<script>
import tebbarhome from "../../components/Publictebbar/Publictebbar";
import ajax from "../../api/https.js";
import storage from "../../api/storage.js";
export default {
  data() {
    return {
      // storageList:{mobile:null},
      dialogVisible: false, //弹窗
      messagesName: {}, //用户信息
      TotalAssets: "", //用户资产
      investorType: "", //投资者类型
      investorTypeList: {},
      userData: {},
      IsAdmin: "",
      openId: "",
      isQualified: "",
      countData:'',
      loading:true,
      checked:false
    };
  },
  methods: {
    gos() {
      this.$router.push({ path: "/NavBar/CParameter/CurrencyData" });
      // console.log(121212)
    },
    //获取Token接口
    getName() {
      ajax.auth
        .bind(this)({
          openId: this.openId
        })
        .then(res => {
          this.checked = storage.get("val");
          if(this.checked==true){
            this.dialogVisible=false;
          }else{
          this.dialogVisible=true;
          }
          this.getStorage();
          this.getTotalAssets();
          this.getInvestorType();
        })
        .catch(error => {
          console.log(error);
        });
    },
    //用户资产
    getTotalAssets() {
      ajax.authGet.bind(this)("/api/Information/Present/Asset", res => {
        this.TotalAssets = res.data.data;
      });
      //是否是合格投资者
      ajax.authGet.bind(this)("/api/Permission/IsQualified", res => {
        this.isQualified = res.data.data;
      });
      //获取待签署的合同数
      ajax.authGet.bind(this)('/api/Information/Present/Signing/Count',res=>{
        this.countData = res.data.data
      })
    },
    //记住我的选择
    change(val) {
      storage.set("val", val);
    },
    getStorage() {
      //用户信息
      ajax.authGet.bind(this)("/api/Information/Account/GetByOpenId", res => {
        this.userData = res.data.data;
        this.loading = false;
      });
      //是否是管理员
      ajax.authGet.bind(this)("/api/Permission/IsAdmin", res => {
        this.IsAdmin = res.data.data;
      });
    },
    getInvestorType() {
      ajax.authGet.bind(this)(
        "/api/Information/Account/Authentication",
        res => {
          this.investorTypeList.investorType =
            res.data.data && res.data.data.investorType;
        }
      );
    }
  },
  mounted() {
    var openId = this.$route.query.openId;
    if (!openId) {
      openId = storage.get("openId");
    }
    // openId = "oHnB5wBgy_FXh1ICjO0sV44DFO9k";
    // openId = "oHnB5wBgy_FXh1ICjO0sV44DFO9k1";
    // openId = "oHnB5wBgy_FXh1ICjO0sV44DFO9k2";
    // openId = "oHnB5wBgy_FXh1ICjO0sV44DFO9k3";
    if (!openId) {
      var cHost = location.origin + "/#/Publicfore";
      ajax.get.bind(this)(
        "/api/Wx/Code",
        res => {
          location.href = res.data.data;
        },
        res => {
          //重定向到错误页面
          this.$router.push({ path: "/ErrorPage" });
        }
      );
      return;
    }
    storage.set("openId", openId);
    this.openId = openId;
    this.getName();

    if (window.touchSet) {
      document.body.removeEventListener("touchmove",window.touchSet);
    }
  },
  components: {
    "tabbar-home": tebbarhome
  }
};
</script>

<style lang="less">
.myhome {
  background: #dde1e6;
  padding-top: 40px;
  /deep/.el-dialog__footer{
    line-height: 40px;
  }
  .myhomettop {
    width: 100%;
    padding: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    .myhometimg {
      .imges {
        width: 80px;
        height: 80px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .imgtime {
        height: 25px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        p {
          line-height: 25px;
          color: #fff;
          text-align: center;
        }
      }
    }
    .myhomerequrey {
      padding-left: 20px;
    }
  }
  .merges {
    padding-bottom: 115px;
    .myhometcenter {
      margin-top: 10px;
      .myhometupdey {
        width: 100%;
        height: 40px;
        padding: 0 8px;
        border-bottom: 1px solid #cac0c0;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          font-size: 16px;
          margin: 0;
          color: #000;
        }
      }
    }
  }
}
</style>
