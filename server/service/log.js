// log 生成
const bunyan = require("bunyan")
const path = require("path")
const fs = require("fs")

const dir = require("./../utils/dir")
const conf = require("./../conf/base")

let { logDirPath, logFileName } = conf

// 生成log存放目录
let log_dirname = path.resolve(__dirname, "..", logDirPath)
dir.fsMkdirsSync(log_dirname)

const log = bunyan.createLogger({
    name: "blog",
    streams: [
        {
            type: "rotating-file",
            path: path.resolve(log_dirname, logFileName),
            period: "1w", // log切片周期
            count: 5 // 保留文件数
        }
    ]
})

module.exports = log
