const ratelimit = require("koa-ratelimit")

const options = {
    duration: 1000,
    errorMessage: "Slow Down Your Request.",
    id: ctx => ctx.ip,
    max: 10
}

module.exports = {
    async execute({ app, service }) {
        let { redis } = service
        const config = Object.assign({}, options, { db: redis })
        app.use(ratelimit(config))
    }
}
