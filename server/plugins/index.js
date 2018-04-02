const fs = require("fs")
const path = require("path")

function loader(service, loaderName) {
    const url = path.resolve(__dirname, `./${loaderName}`)
    const dir = fs.readdirSync(url)

    return dir.map(filename => {
        const obj = require(url + "/" + filename)
        if (!obj.service) {
            return obj.execute
        } else {
            return obj.execute(service)
        }
    })
}

module.exports = service => {
    return {
        beforeServerStart: loader(service, "beforeServerStart"),
        beforeUseRoutes: loader(service, "beforeUseRoutes"),
        beforeRestful: loader(service, "beforeRestful"),
        afterRestful: []
    }
}
