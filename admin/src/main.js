import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/"
import axios from "axios"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import prompt from "./util/prompt"

Vue.use(ElementUI)
Vue.use(prompt)

/* eslint-disable no-new */

const api = axios.create({
    baseURL: process.env.HOST
})
api.interceptors.request.use(function(config) {
    const token = window.localStorage.getItem("token")
    if (token) config.headers["authorization"] = token
    return config
})

Vue.prototype.$api = api

new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
})
