module.exports = {
    async execute(ctx, next) {
        const isLogin = ctx.url.startsWith("/api/admin/login")
        const isGet = ctx.url.startsWith("/api/") && ctx.method === "GET"
        if (isLogin || isGet) return next()
        const headers = ctx.request.headers
        const service = ctx._service
        const { errorInfo, log } = service

        let token = headers["authorization"]
        if (!token) return (ctx.body = errorInfo.TOKEN_GET_FAIL)

        const result = service.token.verfiyToken(token)
        if (!result) return (ctx.body = errorInfo.TOKEN_VERFIY_FAIL)

        let reply = await service.getAsync("token")

        if (reply === token) {
            return next()
        } else {
            return (ctx.body = errorInfo.TOKEN_VERFIY_FAIL)
        }
    }
}
