const cors = require("@koa/cors")

module.exports = {
    async execute({ app, conf }) {
        // 添加跨域白名单识别
        app.use(
            cors(ctx => {
                ~conf.origin.indexOf(ctx.request.origin) && ctx.request.origin
            })
        )
    }
}
