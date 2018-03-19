import Vue from "vue"
import App from "./App.vue"
import { createStore } from "./store"
import { createRouter } from "./router"
import { sync } from "vuex-router-sync"
import axios from "axios"

const isProd = process.env.NODE_ENV === "production"

axios.create({
    baseURL: process.env.host
})

Vue.prototype.$api = axios

export function createApp() {
    const store = createStore()
    const router = createRouter()

    sync(store, router)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store }
}
