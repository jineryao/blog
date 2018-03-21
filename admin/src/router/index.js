import Vue from "vue"
import Router from "vue-router"

import Login from "@/view/Login.vue"

Vue.use(Router)

export default new Router({
    mode: "history",
    scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 },
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login
        }
    ]
})
