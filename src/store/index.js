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
        // state=JSON.stringify(state);
        // localStorage.setItem('state',state);
        // var list=localStorage.getItem('state');
        // list=JSON.parse(list)
        // console.log(list)
    },
    dele(){
        localStorage.removeItem('state');
    }
}

// 实例化vuex.store
const store = new Vuex.Store({
    state,
    mutations:mutations
})

// 把store暴露出来
export default store;