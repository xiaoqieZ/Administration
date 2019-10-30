<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
  // data(){
  //   return{

  //   }
  // }
};
</script>

<style lang="less">
#app {
  font-size: 14px;
}
.el-submenu__title {
  padding-left: 25px !important;
  height: 30px !important;
  line-height: 30px !important;
}
/deep/.el-autocomplete-suggestion {
  z-index: 9999 !important;
}
</style>
