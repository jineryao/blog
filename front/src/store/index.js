import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            tags: [
                "javeScript",
                "web",
                "linux",
                "webpack",
                "vue",
                "react",
                "http"
            ],
            siteInfo: {
                title: "smcat",
                avatar: "http://img.mp.sohu.com/upload/20170802/eb0902ecc7f547d2a09b0565321a5f19_th.png",
                menu: [
                    { label: "首页", path: "/", type:"icon-homepage" },
                    { label: "归档", path: "/archive", type:"icon-tasklist" },
                    { label: "标签", path: "/tag", type:"icon-label" },
                    { label: "相册", path: "/photo", type:"icon-camera" },
                    { label: "关于", path: "/about", type:"icon-people" }
                ]
            }
        },
        mutations: {
            SET_SITEIFNO(state, siteInfo) {
                Vue.set(state, "siteInfo", siteInfo)
            },
            SET_TAGS(state, tags) {
                Vue.set(state, "tags", tags)
            }
        },
        getters: {
            siteInfo(state) {
                return state.siteInfo
            },
            tags(state) {
                return state.tags
            }
        }
    })
}
