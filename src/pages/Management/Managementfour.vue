<template>
  <div>
    <div>问卷管理</div>
    <div class="management">
      <div class="managet">
       <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/NavBar/Managements/Managementfour/RiskQuestionnaire">
				<span class="mui-tab-label" style="font-size: 14px;">风险调查问卷</span>
			</router-link>
			<router-link class="mui-tab-item" to="/NavBar/Managements/Managementfour/KnowledgeAssessment">
				<span class="mui-tab-label" style="font-size: 14px;">知识评测</span>
			</router-link>
			<router-link class="mui-tab-item" to="/NavBar/Managements/Managementfour/BackaccessVolume">
				<span class="mui-tab-label" style="font-size: 14px;">回访问卷</span>
			</router-link>
		</nav>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  mounted(){
      this.$router.push({path: '/NavBar/Managements/Managementfour/RiskQuestionnaire'})
  }
};
</script>

<style lang="less" scoped>
.management {
  margin-top: 10px;
  background: #ffffff;
  .managet {
    padding: 10px;
    /deep/.mui-bar-tab{
        position: inherit;
    }
  }
}
</style>

<!-- 表格数据操作 -->
              