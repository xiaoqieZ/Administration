import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

// 储存数据
var state={
    count:1,
}
// 改变state里面数据的方法
var mutations={
    include(){
        ++state.count;
        // state=JSON.stringify(state);  //把state这个对象转换成字符串
        // localStorage.setItem('state',state);  //储存数据，前面的是变量名，后面的是赋给变量的值
        // var list=localStorage.getItem('state');  //把保存的state取出来
        // list=JSON.parse(list);  //转换回对象的形式
        // console.log(list)
    },
    // dele(){   //清除localstorage
    //     localStorage.removeItem('state');
    // }
}
const actions = {}
const getters = {}

// 实例化vuex.store
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})

// 把store暴露出来
export default store
