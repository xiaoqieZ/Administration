export default function post(u,data,then,s){
    var url="http://mx.maplegg.com"+u;
    this.$http.post(url,data).then(then)
}

function get(u,data,then){
    var url="http://mx.maplegg.com"+u;
    this.$http.get(url,data).then(then)
}
export {
    post,
    get
}