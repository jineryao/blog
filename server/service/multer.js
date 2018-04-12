const crypto = require("crypto")
const multer = require("koa-multer")
const path = require("path")

const dir = require("./../utils/dir")
const conf = require("./../conf/base")

let dirName = `${conf.staticDirName}/${conf.uploadImgDirName}`
let desDirName = path.resolve(__dirname, "..", dirName)
dir.fsMkdirsSync(desDirName)

//配置
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, desDirName)
    },
    filename: function(req, file, cb) {
        let fileFormat = file.originalname.split(".")
        cb(
            null,
            `${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${
                fileFormat[fileFormat.length - 1]
            }`
        )
    }
})

let upload = multer({ storage })

module.exports = [
    upload.single("file"),
    async (ctx, next) => {
        ctx.body = {
            status: "success",
            result: ctx.req.file.filename
        }
    }
]
