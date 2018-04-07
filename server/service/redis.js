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

client.getAsync = key => {
    return new Promise((resolve, reject) => {
        try {
            client.get(key, function(err, res) {
                if (err) return reject(err)
                resolve(res)
            })
        } catch (err) {
            reject(err)
        }
    })
}

client
    .on("ready", () => {
        log.info("Redis is ready")
    })
    .on("error", err => log.error(`Redis ${err}`))

module.exports = client
