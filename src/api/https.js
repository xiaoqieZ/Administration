//  let dom="http://192.168.28.213:5000";
 let domain="http://mx.maplegg.com";
 
 function post(url, data, then, cat) {
     if (data instanceof Function) {
         cat = then;
         then = data;
     }
     if (!cat) {
         cat = res => {};
     }
     var url = domain + url;
     this.$axios.post(url, data).then(then).catch(cat)
 }

 function get(url,data, then, cat) {
     if(data instanceof Function) {
         cat = then;
         then = data;
     }
     var url = domain + url;
     this.$axios.get(url,data).then(then).catch(cat)
 }
 function doms(url){
    return "http://192.168.28.213:5000"+url;
 }

 //获取token的接口
 function auth(data) {
     return this.$axios({
         url: "/api/Home/Get",
         method: 'post',
         data: data,
         baseURL: "http://192.168.28.213:5000",
     }).then(res=>{
        sessionStorage.setItem("access_token",res.data.data.access_token)
     })
 }

 function authGet(url, params, then, cat) {
     //获取access_token
     var token=sessionStorage.getItem("access_token");

     if (params instanceof Function) {
         cat = then;
         then = params;
     }
     if (!cat) {
         cat = res => {};
     }
     if (token) {
         return this.$axios({
             headers: {
                 'Authorization': 'Bearer ' + token
             },
             url: url,
             method: 'get',
             params: params,
             baseURL: "http://192.168.28.213:5000",
         }).then(then).catch(cat)
     } else {
         //异常页面
     }
 }

 function authPost(url, data, then, cat) {
     //获取access_token
     var token=sessionStorage.getItem("access_token");

     if (data instanceof Function) {
         cat = then;
         then = data;
     }
     if (!cat) {
         cat = res => {};
     }
     if (token) {
         return this.$axios({
             headers: {
                 'Authorization': 'Bearer ' + token
             },
             url: url,
             method: 'post',
             data: data,
             baseURL: "http://192.168.28.213:5000",
         }).then(then).catch(cat)
     } else {
         //异常页面
     }
 }

 export default {
     post,
     get,
     authGet,
     authPost,
     auth,
     doms
 }