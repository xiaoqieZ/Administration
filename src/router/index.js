import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '@/NavBar/NavBarLeft'
import Homepage from '@/pages/Homepage/Homepage'
import Null from '@/components/CParameter'
import CurrencyData from '@/pages/MainPages/CurrencyData'
import CTAllocation from '@/pages/MainPages/CTAllocation'
import CCTAllocation from '@/pages/MainPages/CCTAllocation'
import CCCtallocation from '@/pages/MainPages/CCCtallocation'
import CCCCtallocation from '@/pages/MainPages/CCCCtallocation'
import CCCCCtallocation from '@/pages/MainPages/CCCCCtallocation'
import BbankData from '@/pages/BankData/BbankData'
import BankData from '@/pages/BankData/BankData'
import AccountManage from '@/pages/UserManage/AccountManage'
import UserFun from '@/pages/UserManage/UserFun'
import UserRecord from '@/pages/UserManage/UserRecord'
import UserInfo from '@/pages/UserManage/UserInfo'
import Aparameters from '@/pages/MemberManage/Aparameters'
import Pushmessage from '@/pages/Pushmessage/Pushmessageone'
import Pushmessagetow from '@/pages/Pushmessage/Pushmessagetow'
import Pushmessagethree from '@/pages/Pushmessage/Pushmessagethree'
import Managementone from '@/pages/Management/Managementone'
import Managementtow from '@/pages/Management/Managementtow'
import Managementthree from '@/pages/Management/Managementthree'
import Managementfour from '@/pages/Management/Managementfour'
import Managementfive from '@/pages/Management/Managementfive'
import Managementsix from '@/pages/Management/Managementsix'
import Managementseven from '@/pages/Management/Managementseven'

// APP
import Publicfore from '@/PublicNumber/Publicfore/Publicfore.vue'
import Publicone from '@/PublicNumber/Publicone/Publicone.vue'
import Publicthree from '@/PublicNumber/Publicthree/Publicthree.vue'
import Publictow from '@/PublicNumber/Publictow/Publictow.vue'

import Information from '@/PublicNumber/Publicone/Information/Information.vue'
import Identification from '@/PublicNumber/Publicfore/Information/Identification.vue'
import Authentication from '@/PublicNumber/Publicfore/Information/Authentication.vue'
import Assessment from '@/PublicNumber/Publicfore/Information/Assessment.vue'
import Acquisition from '@/PublicNumber/Publicfore/Information/Acquisition.vue'
import Material from '@/PublicNumber/Publicfore/Information/Material.vue'
import Conversion from '@/PublicNumber/Publicfore/Information/Conversion.vue'
import Reservation from '@/PublicNumber/Publicfore/TransactionRecord/Reservation.vue'
import Purchase from '@/PublicNumber/Publicfore/TransactionRecord/Purchase.vue'
import Redeem from '@/PublicNumber/Publicfore/TransactionRecord/Redeem.vue'
import Returnvisit from '@/PublicNumber/Publicfore/TransactionRecord/Returnvisit.vue'

import Purchases from '@/PublicNumber/Publicthree/purchase/purchases.vue'


import Login from '@/login/Login/'

Vue.use(Router)

export default new Router({
  
  routes: [
    {
      path:'/',
      redirect: '/Publicone',
    },
    // 前台
    {
      path: '/Publicone',
      name: 'Publicone',
      title:'首页',
      component: Publicone
    },
    {
      path: '/Publictow',
      name: 'Publictow',
      title:'关于我们',
      component: Publictow
    },
    {
      path: '/Publicthree',
      name: 'Publicthree',
      title:'私募产品',
      component: Publicthree
    },
    {
      path: '/Publicfore',
      name: 'Publicfore',
      title:'我的',
      component: Publicfore,
    },
    {
      path:'/Publicfore/04',
      name: '04',
      component: Null,
      children: [
        {
          path: '/Publicfore/04/Identification',
          name: 'Identification',
          title:'投资者认定',
          component: Identification
        },
        {
          path: '/Publicfore/04/Authentication',
          name: 'Authentication',
          title:'实名认证',
          component: Authentication
        },
        {
          path: '/Publicfore/04/Assessment',
          name: 'Assessment',
          title:'风险评测',
          component: Assessment
        },
        {
          path: '/Publicfore/04/Acquisition',
          name: 'Acquisition',
          title:'信息采集',
          component: Acquisition
        },
        {
          path: '/Publicfore/04/Material',
          name: 'Material',
          title:'证明材料',
          component: Material
        },
        {
          path: '/Publicfore/04/Conversion',
          name: 'Conversion',
          title:'投资者转化',
          component: Conversion
        },
      ]
    },
    {
      path: '/Publicthree/Purchases',
      name: 'Purchases',
      title:'购买',
      component:Purchases
    },
    {
      path:'/Publicfore/07',
      name: '07',
      title:'交易记录',
      component: Null,
      children: [
        {
          path: '/Publicfore/07/Reservation',
          name: 'Reservation',
          title:'预约记录',
          component: Reservation
        },
        {
          path: '/Publicfore/07/Purchase',
          name: 'Purchase',
          title:'购买申请记录',
          component: Purchase
        },
        {
          path: '/Publicfore/07/Redeem',
          name: 'Redeem',
          title:'赎回记录',
          component: Redeem
        },
        {
          path: '/Publicfore/07/Returnvisit',
          name: 'Returnvisit',
          title:'回访记录',
          component: Returnvisit
        },
      ]
    },
    {
      path:'/Information',
      name:'Information',
      title:'热门资讯',
      component:Information
    },


// 后台
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
        {
          path: '/NavBar',
          name: 'NavBar',
          component: NavBar,         //公共导航栏
          children: [
            // 首页
            {
              path: '/Homepage',
              name: 'Homepagehome',
              component: Null,
              children: [
                {
                  path: '/NavBar/Homepage/Homepage',
                  name: 'Homepage',
                  component: Homepage
                }
              ]
            },
            // 适当性管理
            {
              path: 'CParameter',
              name: 'CParameter',
              component: Null,
              children: [
                {
                  path: '/NavBar/CParameter/CurrencyData',
                  name: 'CurrencyData',
                  meta: {
                    title: '客户信息'
                  },
                  component: CurrencyData
                },
                {
                  path: '/NavBar/CParameter/CTAllocation',
                  name: 'CTAllocation',
                  component: CTAllocation
                },
                {
                  path: '/NavBar/CParameter/CCTAllocation',
                  name: 'CCTAllocation',
                  component: CCTAllocation
                },
                {
                  path: '/NavBar/CParameter/CCCtallocation',
                  name: 'CCCtallocation',
                  component: CCCtallocation
                },
                {
                  path: '/NavBar/CParameter/CCCCtallocation',
                  name: 'CCCCtallocation',
                  component: CCCCtallocation
                },
                {
                  path: '/NavBar/CParameter/CCCCCtallocation',
                  name: 'CCCCCtallocation',
                  component: CCCCCtallocation
                }
              ]
            },
            // 信息披露
            {
              path: 'DataDitionary',
              name: 'DataDitionary',
              component: Null,
              children: [
                {
                  path: '/NavBar/DataDitionary/BankData',
                  name: 'BankData',
                  component: BankData
                },
                {
                  path: '/NavBar/DataDitionary/BbankData',
                  name: 'BbankData',
                  component: BbankData
                }
              ]
            },
            // 电子签约
            {
              path: 'UserManage',
              name: 'UserManage',
              component: Null,
              children: [
                {
                  path: '/NavBar/UserManage/AccountManage',
                  name: 'AccountManage',
                  component: AccountManage
                },
                {
                  path: '/NavBar/UserManage/UserFun',
                  name: 'UserFun',
                  component: UserFun
                },
                {
                  path: '/NavBar/UserManage/UserRecord',
                  name: 'UserRecord',
                  component: UserRecord
                },
                {
                  path: '/NavBar/UserManage/UserInfo',
                  name: 'UserInfo',
                  component: UserInfo
                }
              ]
            },
            // 备案材料
            {
              path: 'MemberManage',
              name: 'MemberManage',
              component: Null,
              children: [
                {
                  path: '/NavBar/MemberManage/Aparameters',
                  name: 'Aparameters',
                  component: Aparameters
                }
              ]
            },
            // 信息推送
            {
              path: 'Pushmessages',
              name: 'Pushmessages',
              component: Null,
              children: [
                {
                  path: '/NavBar/Pushmessages/Pushmessage',
                  name: 'Pushmessage',
                  component: Pushmessage
                },
                {
                  path: '/NavBar/Pushmessages/Pushmessagetow',
                  name: 'Pushmessagetow',
                  component: Pushmessagetow
                },
                {
                  path: '/NavBar/Pushmessages/Pushmessagethree',
                  name: 'Pushmessagethree',
                  component: Pushmessagethree
                }
              ]
            },
            // 系统管理
            {
              path: 'Managements',
              name: 'Managements',
              component: Null,
              children: [
                {
                  path: '/NavBar/Managements/Managementone',
                  name: 'Management',
                  title:'页面设置',
                  component: Managementone
                },
                {
                  path: '/NavBar/Managements/Managementtow',
                  name: 'Managementtow',
                  title:'投资者统计',
                  component: Managementtow
                },
                {
                  path: '/NavBar/Managements/Managementthree',
                  name: 'Managementfour',
                  title:'问卷管理',
                  component: Managementfour
                },
                {
                  path: '/NavBar/Managements/Managementfour',
                  name: 'Managementthree',
                  title:'权限管理',
                  component: Managementthree
                },
                {
                  path: '/NavBar/Managements/Managementfive',
                  name: 'Managementfive',
                  title:'使用统计',
                  component: Managementfive
                },
                {
                  path: '/NavBar/Managements/Managementsix',
                  name: 'Managementsix',
                  title:'同步设置',
                  component: Managementsix
                },
                {
                  path: '/NavBar/Managements/Managementseven',
                  name: 'Managementseven',
                  title:'认证管理',
                  component: Managementseven
                }
              ]
            }
          ]
        } 
    ],
  linkActiveClass:'mui-active'//覆盖默认路由的高亮
})
