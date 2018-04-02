module.exports = {
    async execute({ app, service }) {
        let { log } = service
        app.use(async (ctx, next) => {
            const start = new Date()
            await next()
            const ms = new Date() - start
            log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`)
        })
    }
}
