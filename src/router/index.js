import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '@/NavBar/NavBarLeft'
import Homepage from '@/pages/Homepage/Homepage'
import MainHeader from '@/components/MainHeader'
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


import Login from '@/login/Login/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Publicfore',
      name: 'Publicfore',
      component: Publicfore
    },
    {
      path: '/Publicone',
      name: 'Publicone',
      component: Publicone
    },
    {
      path: '/Publicthree',
      name: 'Publicthree',
      component: Publicthree
    },
    {
      path: '/Publictow',
      name: 'Publictow',
      component: Publictow
    },


    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'NavBar',
      redirect: '/MainHeader/CParameter/CurrencyData',
      component: NavBar,
      children: [
        {
          path: 'MainHeader',
          name: 'MainHeader',
          component: MainHeader,
          children: [
            // 首页
            {
              path: 'Homepage',
              name: 'Homepagehome',
              component: Null,
              children: [
                {
                  path: '/MainHeader/Homepage/Homepage',
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
                  path: '/MainHeader/CParameter/CurrencyData',
                  name: 'CurrencyData',
                  meta: {
                    title: '币种资料管理'
                  },
                  component: CurrencyData
                },
                {
                  path: '/MainHeader/CParameter/CTAllocation',
                  name: 'CTAllocation',
                  component: CTAllocation
                },
                {
                  path: '/MainHeader/CParameter/CCTAllocation',
                  name: 'CCTAllocation',
                  component: CCTAllocation
                },
                {
                  path: '/MainHeader/CParameter/CCCtallocation',
                  name: 'CCCtallocation',
                  component: CCCtallocation
                },
                {
                  path: '/MainHeader/CParameter/CCCCtallocation',
                  name: 'CCCCtallocation',
                  component: CCCCtallocation
                },
                {
                  path: '/MainHeader/CParameter/CCCCCtallocation',
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
                  path: '/MainHeader/DataDitionary/BankData',
                  name: 'BankData',
                  component: BankData
                },
                {
                  path: '/MainHeader/DataDitionary/BbankData',
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
                  path: '/MainHeader/UserManage/AccountManage',
                  name: 'AccountManage',
                  component: AccountManage
                },
                {
                  path: '/MainHeader/UserManage/UserFun',
                  name: 'UserFun',
                  component: UserFun
                },
                {
                  path: '/MainHeader/UserManage/UserRecord',
                  name: 'UserRecord',
                  component: UserRecord
                },
                {
                  path: '/MainHeader/UserManage/UserInfo',
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
                  path: '/MainHeader/MemberManage/Aparameters',
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
                  path: '/MainHeader/Pushmessages/Pushmessage',
                  name: 'Pushmessage',
                  component: Pushmessage
                },
                {
                  path: '/MainHeader/Pushmessages/Pushmessagetow',
                  name: 'Pushmessagetow',
                  component: Pushmessagetow
                },
                {
                  path: '/MainHeader/Pushmessages/Pushmessagethree',
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
                  path: '/MainHeader/Managements/Managementone',
                  name: 'Management',
                  component: Managementone
                },
                {
                  path: '/MainHeader/Managements/Managementtow',
                  name: 'Managementtow',
                  component: Managementtow
                },
                {
                  path: '/MainHeader/Managements/Managementthree',
                  name: 'Managementfour',
                  component: Managementfour
                },
                {
                  path: '/MainHeader/Managements/Managementfour',
                  name: 'Managementthree',
                  component: Managementthree
                },
                {
                  path: '/MainHeader/Managements/Managementfive',
                  name: 'Managementfive',
                  component: Managementfive
                },
                {
                  path: '/MainHeader/Managements/Managementsix',
                  name: 'Managementsix',
                  component: Managementsix
                },
                {
                  path: '/MainHeader/Managements/Managementseven',
                  name: 'Managementseven',
                  component: Managementseven
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
