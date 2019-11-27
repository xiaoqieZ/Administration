var storage = {
    set (key,value){//存数据valu给key
        localStorage.setItem(key,JSON.stringify(value))
    },
    get (key){//取出key
        return JSON.parse(localStorage.getItem(key))
    },
    remove(){//删除
        localStorage.removeItem(key)
    }
}

export default storage //将storage暴露出去