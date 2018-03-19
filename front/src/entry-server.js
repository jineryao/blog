import { createApp } from "./app"

const isDev = process.env.NODE_ENV !== "production"

export default context => {
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        const { app, router, store } = createApp()

        const { url } = context
        const { fullPath } = router.resolve(url).route

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }

        // set router's location
        router.push(url)

        // 等待路由器解决可能的异步钩子。
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 没有匹配的路由
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            //调用路径上匹配的组件的fetchData钩子。
            // preFetch钩子发送一个存储操作并返回一个承诺，
            //当操作完成并存储状态时，就解决了更新。
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
                    //所有的预取挂钩都解决了之后，我们的店就到了。
                    //填充了应用程序所需的状态。
                    //在呈现上下文中显示状态，并让请求处理程序。
                    //在HTML响应中内联状态。这允许客户端
                    //保存服务器端状态，无需复制。
                    //客户端上的初始数据抓取。
                    context.state = store.state
                    resolve(app)
                })
                .catch(reject)
        }, reject)
    })
}
