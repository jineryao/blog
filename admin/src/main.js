import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/"
import axios from "axios"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import PromptBox from "./util/promptbox"

Vue.use(ElementUI)
Vue.use(PromptBox)

/* eslint-disable no-new */

const api = axios.create({
    baseURL: process.env.HOST
})
api.interceptors.request.use(config => {
    const token = window.localStorage.getItem("token")
    if (token) config.headers["authorization"] = token
    return config
})
api.interceptors.response.use(
    res => {
        if (res.data.status === "fail") {
            let msg = res.data.message
            Vue.prototype.$promptbox.msg_error(res.data.message)
            if (msg.startsWith("Token")) {
                Vue.prototype.$promptbox.msg_error(msg)
                // 暂未添加文本本地缓存功能, token失效后只提示, 不直接退出
                // 有缓存后, 待定
                // setTimeout(() => {
                //     window.localStorage.removeItem("token")
                //     location.href = "/"
                // }, 500)
            }
        }
        return res
    },
    err => Promise.reject(err)
)

Vue.prototype.$api = api

new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
})
