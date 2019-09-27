<template>
  <div>
    <div class="shopings">
      <mt-header fixed>
        <router-link to="/Publicthree/purchases" slot="left">
          <mt-button icon="back" @click="fanh">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        id:''
    };
  },
  methods:{
      fanh(){
          let data = this.id
          this.$router.push({path:'/Publicthree/purchases',query:{data}})
      }
  },
  mounted(){
      this.id=this.$route.query.data
  }
};
</script>

<style lang="less">
</style>