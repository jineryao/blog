import Vue from "vue"
import Router from "vue-router"
import createPageView from "./../views/CreatePageView"

Vue.use(Router)

const requireView = page => () => import(`../views/${page}.vue`)

export function createRouter() {
    return new Router({
        mode: "history",
        fallback: false,
        scrollBehavior: (to, from, savedPosition) =>
            savedPosition || { x: 0, y: 0 },
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
                // BlogPage
            },
            {
                path: "/about",
                name: "about",
                component: createPageView("about", "about")
            },
            { path: "/", component: requireView("ItemList") }
        ]
    })
}
