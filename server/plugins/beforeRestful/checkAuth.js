module.exports = {
    async execute(ctx, next) {
        const isLogin = ctx.url.startsWith("/api/admin/login")
        const isGet = ctx.url.startsWith("/api/") && ctx.method === "GET"
        if (isLogin || isGet) return next()
        const headers = ctx.request.headers
        const _service = ctx._service
        const { receipt, log } = _service

        let token = headers["authorization"]
        if (!token) return (ctx.body = receipt.TOKEN_GET_FAIL)

        const result = _service.token.verifyToken(token)

        if (!result) return (ctx.body = receipt.TOKEN_VERFIY_FAIL)

        let reply = await _service.redis.getAsync("token")

        if (reply === token) {
            return next()
        } else {
            return (ctx.body = receipt.TOKEN_VERFIY_FAIL)
        }
    }
}
