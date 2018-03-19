import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const requireView = page => () => import(`../views/${page}.vue`)

export function createRouter() {
    return new Router({
        mode: "history",
        fallback: false,
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: "/", component: requireView("ItemList") },
            {
                path: "/post/:pathName?",
                name: "post",
                component: requireView("BlogPage")
            }
        ]
    })
}
