//   let dom="http://192.168.28.213:5000";
   let dom="https://www.juhuifund.com/foundation";

function thenCallBack(res, then, cat) {
    console.log(res);
    if (res.data.code == 200) {
        then.call(this, res);
    } else {
        this.$message({
            message: res.data.message,
            type:"error"
          });
        cat&&cat.call(this,res);
    }

}

function post(url, data, then, cat) {
    if (data instanceof Function) {
        cat = then;
        then = data;
        data=undefined;
    }
    if (!cat) {
        cat =res=>{};
    }
    var url = dom + url;
    this.$axios.post(url, data).then(res => {
        thenCallBack.call(this,res,then, cat);
    }).catch(resCatch.bind(this))
}

function get(url, data, then, cat) {
    if (data instanceof Function) {
        cat = then;
        then = data;
        data=undefined;
    }
    var url = dom + url;
    this.$axios.get(url, data).then(res => {
        thenCallBack.call(this,res,then, cat);
    }).cat(resCatch.bind(this))
}

function doms(url) {
    //return "http://139.199.78.199/foundation"+url;
    return dom + url;
}

//获取token的接口
function auth(data) {
    return this.$axios({
        url: "/api/Home/Token",
        method: 'post',
        data: data,
        baseURL: dom,
    }).then(res => {
        sessionStorage.setItem("access_token", res.data.data.access_token)
    }).catch(resCatch.bind(this))
}

function authGet(url, params, then, cat) {
    //获取access_token
    var token = sessionStorage.getItem("access_token");

    if (params instanceof Function) {
        cat = then;
        then = params;
        params=undefined;
    }
    if (!cat) {
        cat = res=>{};
    }
    if (token) {
        return this.$axios({
            headers: {
                'Authorization': 'Bearer ' + token
            },
            url: url,
            method: 'get',
            params: params,
            baseURL: dom,
        }).then(res => {
            thenCallBack.call(this,res,then, cat);
        }).catch(resCatch.bind(this));
    } else {
        //异常页面
        this.$router.push({path: '/ErrorPage'})
    }
}

function authPost(url, data, then, cat) {
    //获取access_token
    var token = sessionStorage.getItem("access_token");

    if (data instanceof Function) {
        cat = then;
        then = data;
        data=undefined;
    }
    if (!cat) {
        cat = res=>{};
    }
    if (token) {
        return this.$axios({
            headers: {
                'Authorization': 'Bearer ' + token
            },
            url: url,
            method: 'post',
            data: data,
            baseURL: dom,
        }).then(res => {
            thenCallBack.call(this,res,then, cat);
        }).catch(resCatch.bind(this))
    } else {
        //异常页面
        this.$router.push({path: '/ErrorPage'})
    }
}

function authPostForm(url, data, then, cat) {

    if (data instanceof Function) {
        authPost(url, data, then, cat);
    } else {
        //获取access_token
        var token = sessionStorage.getItem("access_token");
        if (!cat) {
            cat =res=>{};
        }
        url=stringfy(url,data);

        if (token) {
            return this.$axios({
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                url: url,
                method: 'post',
                //data: value,
                baseURL: dom,
            }).then(res => {
                thenCallBack.call(this,res,then);
            }).catch(cat)
        } else {
            //异常页面
            this.$router.push({path: '/ErrorPage'})
        }
    }
}
function stringfy(url,data){
    
    var value = "";
    if (data instanceof String) {
        value = data;
    } else {
        for (var i in data) {
            value += i + "=" + data[i] + "&";
        }
        value = value && value.substr(0, value.length - 1);
    }
    url += url.indexOf("?") > -1 ? ("&" + value) : ("?" + value)
    return dom+url;
}
function getMaterialId(response,callback){
    if(response.code!=200){
        this.$message({
            message: response.message,
            type:"error"
          });
          callback&&callback();
          return 0;
    }else{
        return response.data.id
    }
}
function resCatch(res){
    this.$message({
        message: res.message,
        type:"error"
      })
}

export default {
    post,
    get,
    authGet,
    authPost,
    auth,
    doms,
    authPostForm,
    stringfy,
    getMaterialId
}