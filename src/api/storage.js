var storage = {
    set (key,value){//存数据valu给key
        sessionStorage.setItem(key,JSON.stringify(value))
    },
    get (key){//取出key
        return JSON.parse(sessionStorage.getItem(key))
    },
    remove(){//删除
        sessionStorage.removeItem(key)
    }
}

export default storage //将storage暴露出去