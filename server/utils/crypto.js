const crypto = require("crypto")

module.exports = {
    createSalt() {
        return crypto.randomBytes(64).toString('hex')
    },
    dataCrypto(data = null, salt = null) {
        if (!data) throw new Error("data is null")
        if (!salt) salt = this.createSalt()

        const hash = crypto
            .createHmac("sha1", data + salt)
            .update("I love Nodejs -0-")
            .digest("hex")
        return {
            salt,
            hash
        }
    }
}
