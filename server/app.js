const lifecycle = require("./lifecycle/core")

let { app, service, conf } = lifecycle

app.on("error", (err, ctx) => {
    service.log.error("server error: ", err, ctx)
})

app.listen(conf.serverPort, () => {
    service.log.info(`Koa2 is running at ${conf.serverPort}`)
})
