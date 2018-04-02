// 目录相关
const fs = require("fs")
const path = require("path")

module.exports = {
    fsExistsSync,
    fsMkdirsSync,
    loader,
    loadController,
    loadService
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
function fsExistsSync(dirpath) {
    try {
        fs.accessSync(dirpath)
    } catch (e) {
        return false
    }
    return true
}

function loader(url) {
    const dir = fs.readdirSync(url)
    let result = {}
    dir.forEach(filename => {
        const handle = require(url + "/" + filename)
        const key = filename.split(".")[0]
        result[key] = handle
    })
    return result
}

function loadController() {
    const url = path.resolve(__dirname, "../controller")
    return loader(url)
}

function loadService() {
    const url = path.resolve(__dirname, "../service")
    return loader(url)
}
