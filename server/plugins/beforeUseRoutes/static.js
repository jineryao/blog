const serve = require("koa-static")

module.exports = {
    async execute({ app, conf }) {
        app.use(serve(conf.staticDirName))
    }
}
