// 目录相关
const fs = require("fs")
const path = require("path")

module.exports = {
    fsExistsSync,
    fsMkdirsSync,
    loader
}

/**
 * 检查目录是否存在,存在则结束, 不存在则生成
 * @param {any} dirname 目录名字
 * @returns 结束
 */
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

/**
 * 检测目录是否存在
 * @param {any} dirpath 需要检测的目录路径[同步函数]
 * @returns 是/否
 */
function fsExistsSync(dirpath) {
    try {
        fs.accessSync(dirpath)
    } catch (e) {
        return false
    }
    return true
}

/**
 * 遍历目录内文件并加载
 * @param {any} url 需要遍历的目录路径
 * @returns  [ { 文件名: 文件提供的执行函数 } [,...] ]
 */
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
