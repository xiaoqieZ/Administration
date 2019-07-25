import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '@/NavBar/NavBarLeft'
import MainHeader from '@/components/MainHeader'
import Null from '@/components/CParameter'
import CurrencyData from '@/pages/MainPages/CurrencyData'
import CTAllocation from '@/pages/MainPages/CTAllocation'
import CCTAllocation from '@/pages/MainPages/CCTAllocation'
import BankData from '@/pages/BankData/BankData'
import AccountManage from '@/pages/UserManage/AccountManage'
import UserFun from '@/pages/UserManage/UserFun'
import UserRecord from '@/pages/UserManage/UserRecord'
import UserInfo from '@/pages/UserManage/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/',
      name: 'NavBar',
      component: NavBar,
      children:[
        {path:'/', redirect: '/MainHeader/CParameter/CurrencyData'},
        {
          path:'MainHeader',
          name:'MainHeader',
          component:MainHeader,
          children:[
            //币种资料与参数配置
            {
              path: "CParameter",
              name: "CParameter",
              component:Null,
              children:[
                {
                  path:"/MainHeader/CParameter/CurrencyData",
                  name:'CurrencyData',
                  component:CurrencyData
                },
                {
                  path:'/MainHeader/CParameter/CTAllocation',
                  name:'CTAllocation',
                  component:CTAllocation
                },
                {
                  path:'/MainHeader/CParameter/CCTAllocation',
                  name:'CCTAllocation',
                  component:CCTAllocation
                }
              ]
            },
            //数据字典
            {
              path:'DataDitionary',
              name:'DataDitionary',
              component:Null,
              children:[
                {
                  path:'/MainHeader/DataDitionary/BankData',
                  name:'BankData',
                  component:BankData
                }
              ]
            },
            //用户管理
            {
              path:'UserManage',
              name:'UserManage',
              component:Null,
              children:[
                {
                  path:'/MainHeader/UserManage/AccountManage',
                  name:'AccountManage',
                  component:AccountManage
                },
                {
                  path:'/MainHeader/UserManage/UserFun',
                  name:'UserFun',
                  component:UserFun
                },
                {
                  path:'/MainHeader/UserManage/UserRecord',
                  name:'UserRecord',
                  component:UserRecord
                },
                {
                  path:'/MainHeader/UserManage/UserInfo',
                  name:'UserInfo',
                  component:UserInfo
                }
              ]
            },
            // 会员推荐管理
            {
              path:'MemberManage',
              name:'MemberManage',
              component:Null,
              children:[
                {
                  path:'/MainHeader/MemberManage/AccountManage',
                  name:'AccountManage',
                  component:AccountManage
                },
                {
                  path:'/MainHeader/MemberManage/UserFun',
                  name:'UserFun',
                  component:UserFun
                },
                {
                  path:'/MainHeader/MemberManage/UserInfo',
                  name:'UserInfo',
                  component:UserRecord
                },
              ]
            }
          ]
        }
      ]
      
    },
    
  ]
})
