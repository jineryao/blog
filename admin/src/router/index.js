import Vue from "vue"
import Router from "vue-router"

import Login from "@/view/Login.vue"
import Home from "@/view/Home.vue"

import Post from "@/components/Post.vue"

import CreateListView from "./../view/CreateListView"

Vue.use(Router)

export default new Router({
    mode: "history",
    scrollBehavior: (to, from, savedPosition) =>
        savedPosition || { x: 0, y: 0 },
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login
        },
        {
            path: "/home",
            name: "Home",
            component: Home
        },
        {
            path: "/post",
            name: "post",
            component: Home,
            redirect: { name: "postList" },
            children: [
                {
                    path: "list",
                    name: "postList",
                    component: CreateListView({
                        name: "post",
                        options: {}
                    })
                },
                {
                    path: "edit",
                    name: "postEdit",
                    component: Post
                }
            ]
        },
        {
            path: "/page",
            name: "page",
            component: Home,
            redirect: { name: "pageList" },
            children: [
                {
                    path: "list",
                    name: "pageList",
                    component: CreateListView({
                        name: "page",
                        options: {}
                    })
                }
            ]
        }
    ]
})
