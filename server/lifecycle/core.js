const koa = require("koa")
const koaRouter = require("koa-router")
const path = require("path")

const utils = require("./../utils/dir")
const plugins = require("./../plugins/")
const conf = require("./../conf/base")

const resolve = url => path.resolve(__dirname, url)
const app = new koa()
const router = new koaRouter()

module.exports = () => {
    try {
        const controller = utils.loadController()
        const service = utils.loadService()

        app.context._service = service

        router.prefix(conf.prefix)

        let options = {
            app,
            router,
            conf,
            controller,
            service,
            plugins: plugins(service)
        }

        const routerFun = utils.loader(resolve("./../routers/"))

        Object.keys(routerFun).forEach(key => {
            routerFun[key](options)
        })

        app.use(router.routes())
        app.listen(3000, () => {
            log.info(`Koa2 is running at ${conf.serverPort}`)
        })
    } catch (err) {
        log.error(err)
    }
}
