// mongo 连接
const mongoose = require("mongoose")
const conf = require("./../conf/base")
const log = require("./log")
const mongoModel = require("./../model/mongo")

let mongoUrl = "mongodb://"
let { mongoName, mongoPwd, mongoHost, mongoPort, mongoDatabase } = conf
if(mongoName && mongoPwd) mongoUrl += `${mongoName}:${mongoPwd}@`
mongoUrl += `${mongoHost}:${mongoPort}/${mongoDatabase}`

mongoose.connect(mongoUrl, { autoIndex: false })

const db = mongoose.connection
db.on("error", err => log.error(`MongoDB connection error: ${err}`))
db.once("open", () => log.info("MongoDB is ready"))

let models = {}
try {
    let keys = Object.keys(mongoModel)
    keys.forEach(key => {
        let model = mongoose.Schema(mongoModel[key])
        models[key] = mongoose.model(key, model)
    })
} catch (err) {
    log.error(err)
}

module.exports = models
