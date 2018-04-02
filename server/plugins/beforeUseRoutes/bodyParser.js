const bodyParser = require("koa-bodyparser")

module.exports = {
    async execute({ app }) {
        app.use(bodyParser())
    }
}
