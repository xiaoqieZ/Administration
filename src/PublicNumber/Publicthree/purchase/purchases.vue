<template>
  <div class="goshoping">
    <div class="shopings">
      <mt-header fixed>
        <router-link to="/Publicthree" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="fund">
      <span>基金类型</span>
      <span>{{productData.name}}</span>
    </div>
    <P style="height:10px;background:#d4d2d2;"></P>
    <div class="fund">
      <span>风险等级</span>
      <span>{{productData.riskLevelName}}</span>
    </div>
    <div class="fund">
      <van-collapse  v-model="activeNames">
        <van-collapse-item title="投资范围" name="1">{{productRange.scale}}</van-collapse-item>
      </van-collapse>
    </div>
    <P style="height:10px;background:#d4d2d2;"></P>
    <div class="funds">
      <span>基金合同</span>
      <div>
        <p>《【润达基金】基金合同》</p>
        <p>《润达基金_风险揭示书》</p>
      </div>
    </div>
    <P style="height:10px;background:#d4d2d2;"></P>
    <div class="fund">
      <span>基金档案</span>
      <van-icon name="arrow" />
    </div>
    <div class="anniu">
      <el-button type="primary" style="width:48%">预约</el-button>
      <el-button type="primary" style="width:48%" @click="purchase">购买</el-button>
    </div>
  </div>
</template>

<script>
import ajax from "../../../api/https.js";
export default {
  data() {
    return {
      productData: [],
      textarea: "",
      activeNames: ['0'],
      productRange:{},//投资范围
      docuId:'',
    };
  },
  methods: {
      getid(){
          this.docuId=this.$route.query.data
      },
    //获取产品基本信息
    getProduct() {
      ajax.authGet.bind(this)(
        "/api/Information/Present/Product/Hot/" + this.$route.query.data,
        res => {
          this.productData = res.data.data;
        }
      );
    },
    //投资范围
    getRange(){
        ajax.authGet.bind(this)('/api/Information/Present/Product/Investment/'+ this.$route.query.data,
        res=>{
            this.productRange = res.data.data;
        })
    },
    //购买
    purchase(){
        let data = this.docuId
        this.$router.push({path:'/Publicthree/Purchases/riskIdentification',query:{data}})  
    }
  },
  mounted() {
    this.getProduct();
    this.getRange();
    this.getid()
  }
};
</script>

<style lang="less" scoped>
.goshoping {
  width: 100%;
  .shopings {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .fund {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid;
    display: flex;
    justify-content: space-between;
    .van-icon-arrow{
        line-height: 50px;
    }
  }
  .funds {
    height: 70px;
    line-height: 30px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
  .anniu {
    width: 100%;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>