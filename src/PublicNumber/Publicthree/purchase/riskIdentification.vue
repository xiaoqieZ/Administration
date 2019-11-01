<template>
  <div>
    <div class="shopings">
      <mt-header fixed title="基金档案">
        <router-link to="/Publicthree/purchases" slot="left">
          <mt-button icon="back" @click="fanh">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="xinxi">
        <van-tabs v-model="active">
          <van-tab title="简介">
            <div class="brief">
              <div class="brief_title">
                <span>基本信息</span>
              </div>
              <div class="brief_list">
                <p>基金名称</p>
                <p>{{briefData==null||briefData.name==null?'- -':briefData.name}}</p>
              </div>
              <div class="brief_list">
                <p>基金规模</p>
                <p>{{briefData==null||briefData.fundScale==null?'- -':briefData.fundScale}}</p>
              </div>
              <div class="brief_list">
                <p>管理类型</p>
                <p>{{briefData==null||briefData.manageTypeName==null?'- -':briefData.manageTypeName}}</p>
              </div>
              <div class="brief_list">
                <p>基金存续期</p>
                <p>{{briefData==null||briefData.fundDuration==null?'- -':briefData.fundDuration}}</p>
              </div>
              <div class="brief_list">
                <p>产品开放日</p>
                <p>{{briefData==null||briefData.openDay==null?'- -':briefData.openDay}}</p>
              </div>
              <div class="brief_list">
                <p>产品成立日</p>
                <p>{{briefData==null||briefData.fundBirth==null?'- -':briefData.fundBirth}}</p>
              </div>
              <div class="brief_list">
                <p>认/申购起点</p>
                <p>{{briefData==null||briefData.applyAmount==null?'- -':briefData.applyAmount}}</p>
              </div>
              <div class="brief_list">
                <p>追加申购起点</p>
                <p>{{briefData==null||briefData.appendAmount==null?'- -':briefData.appendAmount}}</p>
              </div>
            </div>
          </van-tab>
          <van-tab title="风控">
            <div class="brief">
              <div class="brief_title">
                <span>风险信息</span>
              </div>
              <div class="brief_list">
                <p>风险等级</p>
                <p>{{RiskData==null||RiskData.riskLevel==null?'- -':RiskData.riskLevel}}</p>
              </div>
              <div class="brief_list">
                <p>预警线</p>
                <p>{{RiskData==null||RiskData.warningLine==null?'- -':RiskData.warningLine}}</p>
              </div>
              <div class="brief_list">
                <p>止损线</p>
                <p>{{RiskData==null||RiskData.stopLossLine==null?'- -':RiskData.stopLossLine}}</p>
              </div>
            </div>
          </van-tab>
          <van-tab title="费用">
            <div class="brief">
              <div class="brief_title">
                <span>费率信息</span>
              </div>
              <div class="brief_list">
                <p>申购费</p>
                <p>{{CostData==null||CostData.applyRate==null?'- -':CostData.applyRate}}</p>
              </div>
              <div class="brief_list">
                <p>赎回费</p>
                <p>{{CostData==null||CostData.redeemRate==null?'- -':CostData.redeemRate}}</p>
              </div>
              <div class="brief_list">
                <p>管理费</p>
                <p>{{CostData==null||CostData.manageRate==null?'- -':CostData.manageRate}}</p>
              </div>
              <div class="brief_list">
                <p>托管费</p>
                <p>{{CostData==null||CostData.trusteeshipRate==null?'- -':CostData.trusteeshipRate}}</p>
              </div>
              <div class="brief_list">
                <p>外包服务</p>
                <p>{{CostData==null||CostData.outsourcingRate==null?'- -':CostData.outsourcingRate}}</p>
              </div>
              <div class="brief_list">
                <p>业绩报酬</p>
                <p>{{CostData==null||CostData.performanceRemunerationRate==null?'- -':CostData.performanceRemunerationRate}}</p>
              </div>
              <div class="brief_list">
                <p>投资顾问费</p>
                <p>{{CostData==null||CostData.investmentConsultantRate==null?'- -':CostData.investmentConsultantRate}}</p>
              </div>
            </div>
          </van-tab>
          <van-tab title="投资">
            <div class="brief">
              <div class="brief_title">
                <span>投资情况</span>
              </div>
              <div class="fanwei">
                <p class="Range">投资范围：</p>
                <p
                  class="Range_p"
                >{{InvestmentData==null||InvestmentData.scale==null?'- -':InvestmentData.scale}}</p>
              </div>
              <div class="fanwei">
                <p class="Range">投资策略：</p>
                <p
                  class="Range_p"
                >{{InvestmentData==null||InvestmentData.policy==null?'- -':InvestmentData.policy}}</p>
              </div>
              <div class="fanwei">
                <p class="Range">投资限制情况：</p>
                <p
                  class="Range_p"
                >{{InvestmentData==null||InvestmentData.limit==null?'- -':InvestmentData.limit}}</p>
              </div>
            </div>
          </van-tab>
          <van-tab title="经理">
            <div class="brief">
              <div class="brief_title">
                <span>基金经理</span>
              </div>
              <div class="brief_list">
                <p>基金经理1</p>
                <p>{{managerData==null||managerData.manager1==null?'- -':managerData.manager1}}</p>
              </div>
              <div class="brief_list">
                <p>履历1</p>
                <p>{{managerData==null||managerData.trackRecord1==null?'- -':managerData.trackRecord1}}</p>
              </div>
              <div class="brief_list">
                <p>基金经理2</p>
                <p>{{managerData==null||managerData.manager2==null?'- -':managerData.manager2}}</p>
              </div>
              <div class="brief_list">
                <p>履历2</p>
                <p>{{managerData==null||managerData.trackRecord2==null?'- -':managerData.trackRecord2}}</p>
              </div>
              <div class="brief_list">
                <p>基金经理3</p>
                <p>{{managerData==null||managerData.manager3==null?'- -':managerData.manager3}}</p>
              </div>
              <div class="brief_list">
                <p>履历3</p>
                <p>{{managerData==null||managerData.trackRecord3==null?'- -':managerData.trackRecord3}}</p>
              </div>
            </div>
          </van-tab>
          <van-tab title="机构">
            <div class="brief">
              <div class="brief_title">
                <span>服务机构</span>
              </div>
              <div class="brief_list">
                <p>托管机构</p>
                <p>{{mechanismData==null||mechanismData.trusteeship==null?'- -':mechanismData.trusteeship}}</p>
              </div>
              <div class="brief_list">
                <p>会计事务所</p>
                <p>{{mechanismData==null||mechanismData.accountingFirm==null?'- -':mechanismData.accountingFirm}}</p>
              </div>
              <div class="brief_list">
                <p>投资顾问</p>
                <p>{{mechanismData==null||mechanismData.investmentConsultant==null?'- -':mechanismData.investmentConsultant}}</p>
              </div>
              <div class="brief_list">
                <p>证券交易商</p>
                <p>{{mechanismData==null||mechanismData.security==null?'- -':mechanismData.security}}</p>
              </div>
              <div class="brief_list">
                <p>监督机构信息</p>
                <p>{{mechanismData==null||mechanismData.supervisory==null?'- -':mechanismData.supervisory}}</p>
              </div>
              <div class="brief_list">
                <p>律师事务所</p>
                <p>{{mechanismData==null||mechanismData.lawFirm==null?'- -':mechanismData.lawFirm}}</p>
              </div>
              <div class="brief_list">
                <p>保管机构</p>
                <p>{{mechanismData==null||mechanismData.custodian==null?'- -':mechanismData.custodian}}</p>
              </div>
              <div class="brief_list">
                <p>外包服务商</p>
                <p>{{mechanismData==null||mechanismData.outsource==null?'- -':mechanismData.outsource}}</p>
              </div>
              <div class="brief_list">
                <p>期货交易商</p>
                <p>{{mechanismData==null||mechanismData.futuresDealer==null?'- -':mechanismData.futuresDealer}}</p>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https";
export default {
  data() {
    return {
      active: "",
      id: "", // 上个页面过来的产品Id
      briefData: {}, //简介信息
      RiskData: {}, //风控信息
      CostData: {}, //费用信息
      InvestmentData: {}, //投资信息
      managerData: {}, //经理信息
      mechanismData: {} //机构信息
    };
  },
  methods: {
    // 返回按钮，把产品Id返回过去
    fanh() {
      let data = this.id;
      this.$router.push({ path: "/Publicthree/purchases", query: { data } });
    },
    //封装6个请求数据的方法
    encapsulation(url, res) {
      ajax.authGet.bind(this)(url + this.id, res);
    },
    //简介数据
    getbrief() {
      this.encapsulation("/api/Information/Present/Product/", res => {
        this.briefData = res.data.data;
      });
    },
    //风控信息
    getRisk() {
      this.encapsulation("/api/Information/Present/Product/Risk/", res => {
        this.RiskData = res.data.data;
      });
    },
    //费用信息
    getCost() {
      this.encapsulation("/api/Information/Present/Product/Rate/", res => {
        this.CostData = res.data.data;
      });
    },
    //投资信息
    getInvestment() {
      this.encapsulation("/api/Information/Present/Product/Investment/", res => {
        this.InvestmentData = res.data.data;
      });
    },
    //经理信息
    getmanager() {
      this.encapsulation("/api/Information/Present/Product/Manager/", res => {
        this.managerData = res.data.data;
      });
    },
    //机构信息
    getmechanism() {
      this.encapsulation("/api/Information/Present/Product/Mechanism/", res => {
        this.mechanismData = res.data.data;
      });
    }
  },
  mounted() {
    this.id = this.$route.query.data;
    this.getbrief(); //简介信息
    this.getRisk(); //风控信息
    this.getCost(); //费用信息
    this.getInvestment(); //投资信息
    this.getmanager(); //经理信息
    this.getmechanism(); //机构信息
  }
};
</script>

<style lang="less" scoped>
.shopings {
  .xinxi {
    padding-top: 50px;
    /deep/.van-tabs__content {
      padding: 0 10px;
      .brief {
        padding-top: 10px;
        .brief_title {
          height: 30px;
          font-size: 17px;
          line-height: 30px;
          border-left: 5px solid #26a2ff;
          font-weight: 600;
        }
        .brief_list {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid;
          display: flex;
          justify-content: space-between;
        }
        .fanwei {
          padding-top: 10px;
          .Range {
            font-size: 17px;
            padding: 2px;
          }
          .Range_p {
            text-indent: 2em;
          }
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
.shopings {
  .xinxi {
    padding-top: 50px;
    /deep/.van-tabs__content {
      padding: 0 10px;
      .brief {
        padding-top: 10px;
        .brief_title {
          height: 30px;
          font-size: 17px;
          line-height: 30px;
          border-left: 5px solid #26a2ff;
          font-weight: 600;
        }
        .brief_list {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid;
          display: flex;
          justify-content: space-between;
        }
        .fanwei {
          padding-top: 10px;
          .Range {
            font-size: 17px;
            padding: 2px;
          }
          .Range_p {
            text-indent: 2em;
          }
        }
      }
    }
  }
}

</style>