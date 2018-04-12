import Vue from "vue"
import App from "./App.vue"
import Sidebar from "./components/VSidebar"
import { createStore } from "./store"
import { createRouter } from "./router"
import { sync } from "vuex-router-sync"
import mixin from "./util/mixin"

const isProd = process.env.NODE_ENV === "production"

Vue.mixin(mixin)

export function createApp() {
    const store = createStore()
    const router = createRouter()

    sync(store, router)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return { app, router, store, preFetchComponent: [Sidebar] }
}
