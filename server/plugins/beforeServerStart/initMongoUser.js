// module.exports = class {
//     async beforeServerStart({ log, conf, models }) {
//         const count = models.user
//             .find()
//             .count()
//             .exec()

//         if (!count) return

//         let { adminName, adminPassword, adminDisplayName, adminEmail } = conf

//         const result = await models.user.create({
//             name: adminName,
//             pwd: adminPassword,
//             displayName: adminDisplayName,
//             email: adminEmail
//         })

//         log.info(`account '${result.name}' is created`)
//     }
// }

module.exports = {
    async execute({ service, conf, models }) {
        let { log } = service
        const count = models.user
            .find()
            .count()
            .exec()

        if (!count) return

        let { adminName, adminPassword, adminDisplayName, adminEmail } = conf

        const result = await models.user.create({
            name: adminName,
            pwd: adminPassword,
            displayName: adminDisplayName,
            email: adminEmail
        })

        log.info(`account '${result.name}' is created`)
    }
}
