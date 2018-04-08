import Vue from "vue"
import Router from "vue-router"

import Login from "@/view/Login.vue"
import Home from "@/view/Home.vue"
import Post from "@/components/Post.vue"

import CreateEditView from "./../view/CreateEditView"

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
                    component: CreateEditView({
                        name: "post",
                        items: [
                            {
                                prop: "title",
                                label: "标题",
                                width: "180"
                            },
                            {
                                prop: "pathName",
                                label: "路径",
                                width: "180"
                            },
                            {
                                prop: "tags",
                                label: "标签",
                                width: "180",
                                elTag: true
                            }
                        ]
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
            path: "/option",
            name: "option",
            component: Home,
            redirect: { name: "optionGeneral" },
            children: [
                {
                    path: "general",
                    name: "optionGeneral",
                    component: CreateEditView({
                        name: "general",
                        create: [
                            {
                                prop: "title",
                                label: "网站名称",
                                placeholder: "网站的名称"
                            },
                            {
                                prop: "logoUrl",
                                label: "logo地址",
                                placeholder: "侧边栏logo"
                            },
                            {
                                prop: "description",
                                label: "站点描述",
                                placeholder: "侧边栏描述"
                            },
                            {
                                prop: "siteUrl",
                                label: "博客域名",
                                placeholder: "博客域名 [https://xxx]"
                            },
                            {
                                prop: "faviconUrl",
                                label: "favicon",
                                placeholder: "favicon地址，相对的根路径"
                            },
                            {
                                prop: "keywords",
                                label: "关键词",
                                placeholder: "meta中的keywords，供搜索引擎收录"
                            },
                            {
                                prop: "githubUrl",
                                label: "github地址",
                                placeholder: "github地址 [https://xxx]"
                            },
                            {
                                prop: "weiboUrl",
                                label: "微博地址",
                                placeholder: "微博地址 [https://xxx]"
                            }
                        ]
                    })
                },
                {
                    path: "menu",
                    name: "optionMenu",
                    component: CreateEditView({
                        name: "menu",
                        items: [
                            {
                                prop: "label",
                                label: "菜单栏",
                                width: "180"
                            },
                            {
                                prop: "path",
                                label: "跳转路由",
                                width: "180"
                            }
                        ],
                        create: [
                            {
                                prop: "label",
                                label: "菜单栏",
                                placeholder: "菜单栏名称"
                            },
                            {
                                prop: "path",
                                label: "跳转路由",
                                placeholder: "路由即可 [/xxx/xxx:?]"
                            }
                        ]
                    })
                },
                {
                    path: "comment",
                    name: "optionComment",
                    component: CreateEditView({
                        name: "comment",
                        create: [
                            {
                                prop: "shortName",
                                label: "评论名称",
                                placeholder: "disqus申请的ID"
                            }
                        ]
                    })
                },
                {
                    path: "tags",
                    name: "optionTags",
                    component: CreateEditView({
                        name: "tag",
                        items: [
                            {
                                prop: "tag",
                                label: "标签",
                                width: "180"
                            }
                        ],
                        create: [
                            {
                                prop: "tag",
                                label: "标签名",
                                placeholder: "标签名"
                            }
                        ]
                    })
                },
                {
                    path: "analytic",
                    name: "optionAnalytic",
                    component: CreateEditView({
                        name: "analytic",
                        create: [
                            {
                                prop: "analyzeCode",
                                label: "统计代码",
                                placeholder: "仅支持谷歌统计，填入ID即可"
                            }
                        ]
                    })
                }
            ]
        }
    ]
})
