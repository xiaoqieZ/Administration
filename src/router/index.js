import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/ErrorPage/ErrorPage'
import NavBar from '@/NavBar/NavBarLeft'
import Homepage from '@/pages/Homepage/Homepage'
import Null from '@/components/CParameter'
import CurrencyData from '@/pages/MainPages/CurrencyData'
import CTAllocation from '@/pages/MainPages/CTAllocation'
import CCTAllocation from '@/pages/MainPages/CCTAllocation'
import CCCtallocation from '@/pages/MainPages/CCCtallocation'
import CCCCtallocation from '@/pages/MainPages/CCCCtallocation'
import CCCCCtallocation from '@/pages/MainPages/CCCCCtallocation'
import personalData from '@/pages/MainPages/personalData'
import BbankData from '@/pages/BankData/BbankData'
import BankData from '@/pages/BankData/BankData'
import BankDataList from '@/pages/BankData/BankDataList'
import PositionManagement from '@/pages/BankData/PositionManagement'
import AccountManage from '@/pages/UserManage/AccountManage'
import UserFun from '@/pages/UserManage/UserFun'
import SealEditor from '@/pages/UserManage/SealEditor'
import UserRecord from '@/pages/UserManage/UserRecord'
import UserInfo from '@/pages/UserManage/UserInfo'
import CorporateSeal from '@/pages/UserManage/CorporateSeal'
import Aparameters from '@/pages/MemberManage/Aparameters'
import Pushmessage from '@/pages/Pushmessage/Pushmessageone'
import Pushmessagetow from '@/pages/Pushmessage/Pushmessagetow'
import Pushmessagethree from '@/pages/Pushmessage/Pushmessagethree'
import Managementone from '@/pages/Management/Managementone'
import Managementtow from '@/pages/Management/Managementtow'
import Managementthree from '@/pages/Management/Managementthree'
import Managementfour from '@/pages/Management/Managementfour'
import EditorialQuestionnai from '@/pages/Management/EditorialQuestionnai'
import Managementfive from '@/pages/Management/Managementfive'
import Managementsix from '@/pages/Management/Managementsix'
import Managementseven from '@/pages/Management/Managementseven'

// APP
import Publicfore from '@/PublicNumber/Publicfore/Publicfore.vue'
import Publicone from '@/PublicNumber/Publicone/Publicone.vue'
import Publicthree from '@/PublicNumber/Publicthree/Publicthree.vue'
import Publictow from '@/PublicNumber/Publictow/Publictow.vue'

import Information from '@/PublicNumber/Publicone/Information/Information.vue'
import Identification from '@/PublicNumber/Publicfore/TransactionRecord/Identification.vue'
import ToDeploy from '@/PublicNumber/Publicfore/TransactionRecord/ToDeploy.vue'
import Authentication from '@/PublicNumber/Publicfore/Information/Authentication.vue'
import Assessment from '@/PublicNumber/Publicfore/Information/Assessment.vue'
import Acquisition from '@/PublicNumber/Publicfore/Information/Acquisition.vue'
import Material from '@/PublicNumber/Publicfore/Information/Material.vue'
import Conversion from '@/PublicNumber/Publicfore/Information/Conversion.vue'
import Reservation from '@/PublicNumber/Publicfore/TransactionRecord/Reservation.vue'
import Purchase from '@/PublicNumber/Publicfore/TransactionRecord/Purchase.vue'
import Redeem from '@/PublicNumber/Publicfore/TransactionRecord/Redeem.vue'
import Returnvisit from '@/PublicNumber/Publicfore/TransactionRecord/Returnvisit.vue'
import ReturnvisitAnswer from '@/PublicNumber/Publicfore/TransactionRecord/ReturnvisitAnswer.vue'


import Purchases from '@/PublicNumber/Publicthree/purchase/purchases.vue'
import riskIdentification from '@/PublicNumber/Publicthree/purchase/riskIdentification.vue'
import PurchaseFund from '@/PublicNumber/Publicthree/purchase/purchaseFund.vue'
import Confirmation from '@/PublicNumber/Publicthree/purchase/Confirmation.vue'

import Login from '@/login/Login/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Publicfore',
    },
    {
      path: '/ErrorPage',
      name: 'ErrorPage',
      title: '错误页面',
      component: ErrorPage,
    },
    // 前台
    {
      path: '/Publicone',
      name: 'Publicone',
      title: '首页',
      component: Publicone
    },
    {
      path: '/Publicone/Information',
      name: 'Information',
      title: '热门资讯',
      component: Information
    },
    {
      path: '/Publictow',
      name: 'Publictow',
      title: '关于我们',
      component: Publictow
    },
    {
      path: '/Publicthree',
      name: 'Publicthree',
      title: '私募产品',
      component: Publicthree
    },
    {
      path: '/Publicthree/Purchases',
      name: 'Purchases',
      title: '购买产品',
      component: Purchases
    },
    {
      path: '/Publicthree/Purchases/purchaseFund',
      name: 'purchaseFund',
      title: '确认购买产品',
      component: PurchaseFund
    },
    {
      path: '/Publicthree/Purchases/confirmation',
      name: 'confirmation',
      title: '投资者购买信息确认',
      component: Confirmation
    },
    {
      path: '/Publicthree/Purchases/riskIdentification',
      name: 'riskIdentification',
      title: '基金档案',
      component: riskIdentification
    },
    {
      path: '/Publicfore',
      name: 'Publicfore',
      title: '我的',
      component: Publicfore,
    },
    {
      path: '/Publicfore/Information',
      name: 'Informations',
      title: '认证模块',
      component: Null,
      children: [
        {
          path: '/Publicfore/Information/Authentication',
          name: 'Authentication',
          title: '实名认证',
          component: Authentication
        },
        {
          path: '/Publicfore/Information/Assessment',
          name: 'Assessment',
          title: '风险评测',
          component: Assessment
        },
        {
          path: '/Publicfore/Information/Acquisition',
          name: 'Acquisition',
          title: '信息采集',
          component: Acquisition
        },
        {
          path: '/Publicfore/Information/Material',
          name: 'Material',
          title: '证明材料',
          component: Material
        },
        {
          path: '/Publicfore/Information/Conversion',
          name: 'Conversion',
          title: '投资者转化',
          component: Conversion
        },
      ]
    },
    {
      path: '/Publicfore/TransactionRecord',
      name: 'TransactionRecord',
      title: '交易记录模块',
      component: Null,
      children: [{
          path: '/Publicfore/TransactionRecord/Reservation',
          name: 'Reservation',
          title: '预约记录',
          component: Reservation
        },
        {
          path: '/Publicfore/TransactionRecord/Purchase',
          name: 'Purchase',
          title: '购买申请记录',
          component: Purchase
        },
        {
          path: '/Publicfore/TransactionRecord/Redeem',
          name: 'Redeem',
          title: '赎回记录',
          component: Redeem
        },
        {
          path: '/Publicfore/TransactionRecord/Returnvisit',
          name: 'Returnvisit',
          title: '回访记录',
          component: Returnvisit
        },
        {
          path: '/Publicfore/TransactionRecord/ReturnvisitAnswer',
          name: 'ReturnvisitAnswer',
          title: '回访记录单选',
          component: ReturnvisitAnswer
        },{
          path: '/Publicfore/TransactionRecord/Identification',
          name: 'Identification',
          title: '电子签约',
          component: Identification
        },{
          path: '/Publicfore/TransactionRecord/ToDeploy',
          name: 'ToDeploy',
          title: '电子签约-签署',
          component: ToDeploy
        },
      ]
    },


    // 后台
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    //公共导航栏
    {
      path: '/NavBar',
      name: 'NavBar',
      component: NavBar,
      children: [
        // 首页
        {
          path: '/NavBar/Homepage/Homepage',
          name: 'Homepage',
          component: Homepage,
        },
        // 适当性管理
        {
          path: 'CParameter',
          name: 'CParameter',
          component: Null,
          children: [{
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
              title: '客户审核',
              component: CTAllocation
            },
            {
              path: '/NavBar/CParameter/CCTAllocation',
              name: 'CCTAllocation',
              title: '投资者份额',
              component: CCTAllocation
            },
            {
              path: '/NavBar/CParameter/CCCtallocation',
              name: 'CCCtallocation',
              title: '投资者导入',
              component: CCCtallocation
            },
            {
              path: '/NavBar/CParameter/CCCCtallocation',
              name: 'CCCCtallocation',
              title: '理财顾问',
              component: CCCCtallocation
            },
            {
              path: '/NavBar/CParameter/CCCCCtallocation',
              name: 'CCCCCtallocation',
              title: '智能自查',
              component: CCCCCtallocation
            },
            {
              path: '/NavBar/CParameter/personalData',
              name: 'personalData',
              title: '个人资料',
              component: personalData
            }
          ]
        },
        // 信息披露
        {
          path: 'DataDitionary',
          name: 'DataDitionary',
          component: Null,
          children: [{
              path: '/NavBar/DataDitionary/BankData',
              name: 'BankData',
              title: '产品列表',
              component: BankData
            },
            {
              path: '/NavBar/DataDitionary/PositionManagement',
              name: 'PositionManagement',
              title: '持仓管理',
              component: PositionManagement
            },
            {
              path: '/NavBar/DataDitionary/BankDataList',
              name: 'BankDataList',
              title: '添加产品',
              component: BankDataList
            },
            {
              path: '/NavBar/DataDitionary/BbankData',
              name: 'BbankData',
              title: '日历提醒',
              component: BbankData
            }
          ]
        },
        // 电子签约
        {
          path: 'UserManage',
          name: 'UserManage',
          component: Null,
          children: [{
              path: '/NavBar/UserManage/AccountManage',
              name: 'AccountManage',
              title: '去签约',
              component: AccountManage
            },
            {
              path: '/NavBar/UserManage/UserFun',
              name: 'UserFun',
              title: '基金合同',
              component: UserFun
            },
            {
              path: '/NavBar/UserManage/SealEditor',
              name: 'SealEditor',
              title: '合同印章编辑',
              component: SealEditor
            },
            {
              path: '/NavBar/UserManage/UserRecord',
              name: 'UserRecord',
              title: '公文文件',
              component: UserRecord
            },
            {
              path: '/NavBar/UserManage/UserInfo',
              name: 'UserInfo',
              title: '账户设置',
              component: UserInfo
            },
            {
              path: '/NavBar/UserManage/CorporateSeal',
              name: 'CorporateSeal',
              title: '设置印章',
              component: CorporateSeal
            }
          ]
        },
        // 备案材料
        {
          path: 'MemberManage',
          name: 'MemberManage',
          component: Null,
          children: [{
            path: '/NavBar/MemberManage/Aparameters',
            name: 'Aparameters',
            title: '下载中心',
            component: Aparameters
          }]
        },
        // 信息推送
        {
          path: 'Pushmessages',
          name: 'Pushmessages',
          component: Null,
          children: [{
              path: '/NavBar/Pushmessages/Pushmessage',
              name: 'Pushmessage',
              title: '发送信息',
              component: Pushmessage
            },
            {
              path: '/NavBar/Pushmessages/Pushmessagetow',
              name: 'Pushmessagetow',
              title: '接收消息',
              component: Pushmessagetow
            },
            {
              path: '/NavBar/Pushmessages/Pushmessagethree',
              name: 'Pushmessagethree',
              title: '模板消息',
              component: Pushmessagethree
            }
          ]
        },
        // 系统管理
        {
          path: 'Managements',
          name: 'Managements',
          component: Null,
          children: [{
              path: '/NavBar/Managements/Managementone',
              name: 'Managementone',
              title: '页面设置',
              component: Managementone
            },
            {
              path: '/NavBar/Managements/Managementtow',
              name: 'Managementtow',
              title: '投资者统计',
              component: Managementtow
            },
            {
              path: '/NavBar/Managements/Managementthree',
              name: 'Managementthree',
              title: '权限管理',
              component: Managementthree
            },
            {
              path: '/NavBar/Managements/Managementfour',
              name: 'Managementfour',
              title: '问卷管理',
              component: Managementfour,
            },
            {
              path: '/NavBar/Managements/EditorialQuestionnai',
              name: 'EditorialQuestionnai',
              title: '编辑问卷',
              component: EditorialQuestionnai
            },
            {
              path: '/NavBar/Managements/Managementfive',
              name: 'Managementfive',
              title: '使用统计',
              component: Managementfive
            },
            {
              path: '/NavBar/Managements/Managementsix',
              name: 'Managementsix',
              title: '同步设置',
              component: Managementsix
            },
            {
              path: '/NavBar/Managements/Managementseven',
              name: 'Managementseven',
              title: '认证管理',
              component: Managementseven
            }
          ]
        }
      ]
    }
  ],
  linkActiveClass: 'mui-active' //覆盖默认路由的高亮
})