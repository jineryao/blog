import Vue from "vue"
import Router from "vue-router"
import createPageView from "./../views/CreatePageView"

Vue.use(Router)

const requireView = page => () => import(`../views/${page}.vue`)

export function createRouter() {
    return new Router({
        mode: "history",
        fallback: false,
        scrollBehavior(to, from, savedPosition) {
            setTimeout(() => {
                document.body.scrollTo(0, 0)
            }, 500)
        },
        routes: [
            {
                path: "/tags",
                name: "tags",
                component: requireView("Tags")
            },
            {
                path: "/tag/:tag?",
                name: "tagPage",
                component: requireView("TagPage")
            },
            {
                path: "/post/:pathName?",
                name: "post",
                component: createPageView("BlogPage")
            },
            { path: "/:pathName", component: createPageView() },
            { path: "/", component: requireView("ItemList") }
        ]
    })
}
