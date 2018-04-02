// token 生成/验证
const jwt = require("jsonwebtoken")
const conf = require("./../conf/base")

const secret = conf.tokenSecret
const expiresIn = conf.tokenExpiresIn

module.exports = {
    createToken(userInfo) {
        return jwt.sign(userInfo, secret, {
            expiresIn
        })
    },
    verifyToken(token) {
        if (!token) return false
        try {
            return jwt.verify(token, secret)
        } catch (err) {
            return false
        }
    },
    expiresIn
}
