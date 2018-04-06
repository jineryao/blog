const fs = require("fs")
const path = require("path")

function loader(service, loaderName) {
    const url = path.resolve(__dirname, `./${loaderName}`)
    const dir = fs.readdirSync(url)

    return dir.map(filename => {
        try {
            const obj = require(url + "/" + filename)
            if (obj.execute) {
                return obj.execute
            } else {
                return () => {}
            }
        } catch (err) {
            service.log.error("plugins loader error: ", err)
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
