const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const isProd = process.env.NODE_ENV === "production"

const resolve = file => path.resolve(__dirname, file)
const serve = (path, cache) =>
    express.static(resolve(path), {
        maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
    })

app.use("/static", serve("./dist/static/", true))

app.get("*", (req, res) => {
    fs.readFile(resolve("./dist/index.html"), "utf-8", (err, content) => {
        if (err) console.log('We cannot open "index.htm" file.')

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        })
        res.end(content)
    })
})

const port = process.env.PORT || 5528

app.listen(port, () => {
    console.log(`admin started at localhost:${port}`)
})
