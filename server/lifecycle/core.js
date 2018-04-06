const koa = require("koa")
const koaRouter = require("koa-router")
const path = require("path")

const utilDir = require("./../utils/dir")
const plugins = require("./../plugins/")
const conf = require("./../conf/base")
const log = require("./../service/log")

const resolve = url => path.resolve(__dirname, url)
const app = new koa()
const router = new koaRouter()

let result = {}

try {
    const controller = utilDir.loader(resolve("./../controller/"))
    const service = utilDir.loader(resolve("./../service/"))
    const routerFun = utilDir.loader(resolve("./../routers/"))
    const utils = utilDir.loader(resolve("./../utils/"))

    const middleware = plugins(service)

    app.context._service = service
    app.context._utils = utils

    router.prefix(conf.prefix)

    let options = {
        app,
        router,
        conf,
        controller,
        service,
        utils,
        plugins: middleware
    }

    let { beforeServerStart, beforeUseRoutes } = middleware
    beforeServerStart.forEach(fun => fun(options))
    beforeUseRoutes.forEach(fun => fun(options))

    Object.keys(routerFun).forEach(key => {
        routerFun[key](options)
    })

    // 查看所有添加的路由
    // router.routes().router.stack.forEach(item=> console.log(item.methods[0], item.path))

    app.use(router.routes()).use(router.allowedMethods())

    Object.assign(result, options)
} catch (err) {
    log.error(err)
}

module.exports = result
