// redis 连接
const redis = require("redis")
const log = require("./log")
const conf = require("./../conf/base")

let { redisHost, redisPort, redisPassword } = conf
let options = {
    host: redisHost,
    port: redisPort
}
let pwd = redisPassword ? { password: redisPassword } : {}

const client = redis.createClient(Object.assign(options, pwd))

client.on("ready", () => {
    log.info("Redis is ready")
})

client.on("error", err => log.error(`Redis ${err}`))

module.exports = client
