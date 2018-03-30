// orm model
const mongoose = require("mongoose")

const conf = require("./../conf/server")
const log = require("./../utils/log")
const model = require("./../model/mongo")

let { mongoHost, mongoPort, mongoDatabase } = conf
let { post, tag, user } = model

let mongoUrl = `${mongoHost}:${mongoPort}/${mongoDatabase}`

mongoose.connect(mongoUrl)
const db = mongoose.connection

db.on("error", err => log.error(`MongoDB connection error: ${err}`))
db.once("open", () => log.info("MongoDB is ready"))

let postSchema = mongoose.Schema(post)
let tagSchema = mongoose.Schema(tag)
let userSchema = mongoose.Schema(user)

module.exports = {
    post: mongoose.model("post", postSchema),
    tag: mongoose.model("post", tagSchema),
    user: mongoose.model("post", userSchema)
}
