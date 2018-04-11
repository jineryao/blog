import Vue from "vue"
import "es6-promise/auto"
import { createApp } from "./app"

// 当路由组件的参数发生变化时，全局mixin调用“asyncData”。
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options

        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            })
                .then(next)
                .catch(next)
        } else {
            next()
        }
    }
})

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
// 等待路由器在挂钩前解决所有的异步
// 和异步组件…
router.onReady(() => {
    //添加路由器钩子来处理异步数据。
    //在最初的路线被解决后做它，这样我们就不会重复取回
    //我们已有的数据。使用router.beforeResolve()，这样就可以了
    //异步组件被解决。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c)
        })
        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }

        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                next()
            })
            .catch(next)
    })

    app.$mount("#app")
})
