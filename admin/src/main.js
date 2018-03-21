// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/"
import axios from "axios"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

import elementBox from "./util/elementBox"

Vue.use(ElementUI)

Object.assign(Vue.prototype, elementBox)

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
