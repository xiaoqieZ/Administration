  let dom="http://192.168.28.213:5000";
//   let dom="http://139.199.78.199/foundation";

function thenCallBack(res, then, cat) {
    console.log(res);
    if (res.data.code == 200) {
        then.call(this, res);
    } else {
        this.$message({
            message: res.data.message,
            type:"error"
          });
        cat.call(this,res);
    }

}

function post(url, data, then, cat) {
    if (data instanceof Function) {
        cat = then;
        then = data;
        data=undefined;
    }
    if (!cat) {
        cat = res => {};
    }
    var url = domain + url;
    this.$axios.post(url, data).then(res => {
        thenCallBack.call(this,res,then, cat);
    })
}

function get(url, data, then, cat) {
    if (data instanceof Function) {
        cat = then;
        then = data;
        data=undefined;
    }
    var url = domain + url;
    this.$axios.get(url, data).then(res => {
        thenCallBack.call(this,res,then, cat);
    })
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
    })
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
            baseURL: dom,
        }).then(res => {
            thenCallBack.call(this,res,then, cat);
        });
    } else {
        //异常页面
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
            baseURL: dom,
        }).then(res => {
            thenCallBack.call(this,res,then, cat);
        })
    } else {
        //异常页面
    }
}

function authPostForm(url, data, then, cat) {

    if (data instanceof Function) {
        authPost(url, data, then, cat);
    } else {
        //获取access_token
        var token = sessionStorage.getItem("access_token");
        if (!cat) {
            cat = res => {};
        }
        url=stringfy(data);

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

export default {
    post,
    get,
    authGet,
    authPost,
    auth,
    doms,
    authPostForm,
    stringfy
}