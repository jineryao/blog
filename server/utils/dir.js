const fs = require("fs")
const path = require("path")

module.exports = {
    fsExistsSync,
    fsMkdirsSync
}

// 检查目录是否存在,true直接返回, false则生成
function fsMkdirsSync(dirname) {
    if (fsExistsSync(dirname)) {
        return true
    } else {
        if (fsMkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

// 检测目录是否存在
function fsExistsSync(path) {
    try {
        fs.accessSync(path)
    } catch (e) {
        return false
    }
    return true
}
