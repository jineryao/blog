module.exports = {
    async execute({ service, conf, utils }) {
        let { log, models } = service
        const count = await models.user
            .find()
            .count()
            .exec()

        if (count) return

        let { adminName, adminPassword, adminDisplayName, adminEmail } = conf

        let pwdData = utils.crypto.dataCrypto(adminPassword)

        const result = await models.user.create({
            name: adminName,
            password: pwdData.hash,
            passkey: pwdData.salt,
            displayName: adminDisplayName,
            email: adminEmail
        })

        log.info(`account '${result.name}' is created`)
    }
}
