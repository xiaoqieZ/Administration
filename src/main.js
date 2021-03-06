// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import VueResource from 'vue-resource'// 导入vue-resource
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import 'vuescroll/dist/vuescroll.css'
//导入mui样式，用了TabBar
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入iView插件，用了图标
import iView from 'iview';
import 'iview/dist/styles/iview.css'
//导入Vant插件，用了轮播
import Vant from 'vant'
import 'vant/lib/index.css'
import store from './store/index'

import Axios from "axios"
Vue.prototype.$axios = Axios

Vue.use(Vant)
Vue.use(iView)
Vue.use(vuescroll)
Vue.use(Mint)
Vue.use(VueResource)// 安装vue-resource
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
