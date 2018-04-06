module.exports = {
    async execute(ctx, next) {
        try {
            await next()
            switch (ctx.status) {
                case 404:
                    ctx.throw(404, "not found")
                    break
                default:
                    ctx.throw(500, "internal server error")
                    break
            }
        } catch (err) {
            let fun = err.status === 404 ? "info" : "error"
            ctx._service.log[fun](err, ctx)
        }
    }
}
