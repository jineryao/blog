import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/"
import axios from "axios"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI)

/* eslint-disable no-new */
const api = axios.create({
    baseURL: process.env.HOST
})
Vue.prototype.$api = api

new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
})
