<template>
  <div class="Privates">
    <mt-header fixed title="私募产品"></mt-header>
    <div class="raise" v-show="muj==0">
      <div class="aggre">
        <p>
          您现在是
          <span style="color:red">{{riskName.riskLevelName}}</span>投资者推荐下列产品
        </p>
      </div>
      <div class="plops" v-for="(item,index) in popularData" :key="item.productId">       
          <div class="period">
            <Icon type="ios-bookmark" size="20" />运集期
          </div>
          <div @click="change(item)">
          <div class="huaihe">
            <span>{{item.name}}</span>
          </div>
          <div class="first">
            <div class="sales">
              <div style="text-align: center;margin-left :20px;">
                <p style="color:red;font-weight: 600;">{{item.accumulatedIncome}}</p>
                <p>最新收益</p>
              </div>
              <div class="netWorth">
                <p>
                  单位净值：
                  <span>{{item.unitWorth}}</span>
                </p>
                <p>
                  日期净值：
                  <span>{{item.dateOfWorth}}</span>
                </p>
                <p>
                  基金经理：
                  <span>{{item.manager}}</span>
                </p>
              </div>
            </div>
            <Icon type="md-log-in" class="help" size="25" />
          </div>
        </div>
      </div>
    </div>
    <div class="kong" v-show="muj==1">
      <div class="kgtitle">不实名的话不太想给你展示产品</div>
      <div class="img">
        <img src="../../../static/img/sgd.png" alt="表情包" />
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      width="80%"
      center
    >
      <span>小茄子：需要先实名认证才可以选购基金产品喔！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dssy">去认证</el-button>
      </span>
    </el-dialog>
    <tabbar-home></tabbar-home>
  </div>
</template>

<script>
import tebbarhome from "../../components/Publictebbar/Publictebbar";
import { getCookie } from "../../assets/js/cookie.js";
import storage from "../../api/storage.js";
import ajax from "../../api/https.js";
export default {
  data() {
    return {
      muj: 1, //没有实名认证的话，不展示产品页
      centerDialogVisible: false,
      riskName: {}, //风险等级
      popularData: [],
      page: 1,
      num: 6
    };
  },
  components: {
    "tabbar-home": tebbarhome
  },
  methods: {
    //获取热门产品
    getPopular() {
      let data = {
        pageIndex: this.page,
        pageSize: this.num
      };
      ajax.authPost.bind(this)(
        "/api/Information/Present/Product/Hot",
        data,
        res => {
          this.popularData = res.data.data.list;
        }
      );
    },
    change(item) {
      let data = item.productId;
      //   console.log(data)
      this.$router.push({ path: "/Publicthree/Purchases", query: { data } });
    },
    //去实名
    dssy() {
      this.centerDialogVisible = false;
      this.$router.push({ path: "/Publicfore/Information/Authentication" });
    },
    //拿到用户的风险等级
    getStorage() {
      this.riskName = storage.get("Risk");
    },
    //判断用户是否实名注册过
    getRealName() {
      /*在本地拿到注册页面给的feng*/
      let mname = storage.get("feng");
      /*如果mname等于空，则跳出dialog框，选择回到实名页*/
      if (mname) {
        this.muj = 0;
      } else {
        this.centerDialogVisible = true;
      }
    }
  },
  mounted() {
    this.getRealName(); //实名认证判断
    this.getStorage(); //拿到用户的风险等级
    this.getPopular();
  }
};
</script>

<style lang="less">
.Privates {
  background: #dde1e6;
  .raise {
    margin-top: 40px;
    margin-bottom: 65px;
    background: #fff;
    .aggre {
      height: 60px;
      line-height: 56px;
      border-bottom: 9px solid #d0d0d0;
      p {
        padding-left: 10px;
      }
    }
    .plops {
      .period {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid;
      }
      .huaihe {
        height: 40px;
        line-height: 40px;
      }
      span {
        padding-left: 10px;
      }
      .first {
        height: 70px;
        border-bottom: 1px solid;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sales {
          display: contents;
          .sales {
            .netWorth {
              padding-left: 30px;
            }
          }
          .el-divider--vertical {
            margin: 0 -60px;
          }
        }
        .help {
          padding-right: 10px;
        }
      }
    }
  }
  .kong {
    margin-top: 50px;
    .kgtitle {
      text-align: center;
    }
    .img {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
