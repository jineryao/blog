// orm model
const mongoose = require("mongoose")
const conf = require("./../conf/base")
const log = require("./../utils/log")
const mongoModel = require("./../model/mongo")

let { mongoHost, mongoPort, mongoDatabase } = conf
let mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`
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
