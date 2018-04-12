import { createApp } from "./app"

const isDev = process.env.NODE_ENV !== "production"

export default context => {
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        const { app, router, store, preFetchComponent } = createApp()
        const { url } = context
        const { fullPath } = router.resolve(url).route

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }

        // set router's location
        router.push(url)

        // 等待路由器解决可能的异步钩子。
        router.onReady(() => {
            let matchedComponents = router.getMatchedComponents()

            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            matchedComponents = matchedComponents.concat(preFetchComponent)

            Promise.all(
                matchedComponents.map(
                    ({ asyncData }) =>
                        asyncData &&
                        asyncData({
                            store,
                            route: router.currentRoute
                        })
                )
            )
                .then(() => {
                    isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
                    context.state = store.state
                    resolve(app)
                })
                .catch(err => {
                    console.log(err, "err")
                    reject({ code: 404 })
                })
        }, reject)
    })
}
