import Vuex from "vuex"
import Vue from "vue"
import axios from "./api"

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            $404: {
                title: "404 Not Found",
                content: "<p>你要找的页面不存在。</p>",
                allowComment: false
            },
            tags: {},
            siteInfo: {
                title: "smcat",
                avatar:
                    "http://img.mp.sohu.com/upload/20170802/eb0902ecc7f547d2a09b0565321a5f19_th.png",
                menu: [
                    { label: "首页", path: "/?page=1", type: "icon-homepage" },
                    // { label: "归档", path: "/archive", type: "icon-tasklist" },  // 待定
                    { label: "标签", path: "/tags", type: "icon-label" },
                    // { label: "相册", path: "/photo", type: "icon-camera" }, // 未完成
                    { label: "关于", path: "/about", type: "icon-people" }
                ]
            },
            list: [],
            total: 1,
            limit: 2,
            post: null
        },
        actions: {
            FETCH_ALL(
                { state, commit },
                { path, options = {}, page = 1, Paging = true }
            ) {
                let params = {}
                page = page - 1 < 0 ? 0 : --page

                if (Paging) {
                    params.limit = state.limit
                    params.skip = page * state.limit
                }
                Object.assign(params, options)

                return axios.get(path, { params }).then(res => {
                    commit("SET_LIST", res.data.result)
                    commit("SET_TOTAL", res.data.total)
                })
            },
            FETCH_POST({ state, commit }, { pathName }) {
                let params = {
                    conditions: { pathName },
                    select: {
                        summary: 1,
                        tags: 1,
                        title: 1,
                        toc: 1,
                        createdAt: 1,
                        content: 1,
                        allowComment: 1
                    }
                }
                return axios.get("/post", { params }).then(res => {
                    if (res.data.total > 0) {
                        commit("SET_POST", res.data.result[0])
                    } else {
                        commit("SET_POST", state.$404)
                    }
                })
            },
            FETCH_POST_LIST({ state, commit }, { query }) {},
            FETCH_TAGS({ state, commit }, { options = {} }) {
                return axios.get("/post", { params: options }).then(res => {
                    let tags = []
                    let result = {}
                    res.data.result.forEach(item => tags.push(...item.tags))
                    tags.forEach(tag => {
                        result[tag] ? result[tag]++ : (result[tag] = 1)
                    })
                    commit("SET_TAGS", result)
                })
            }
        },
        mutations: {
            SET_SITEIFNO(state, siteInfo) {
                Vue.set(state, "siteInfo", siteInfo)
            },
            SET_TAGS(state, tags) {
                Vue.set(state, "tags", tags)
            },
            SET_LIST(state, list) {
                Vue.set(state, "list", list)
            },
            SET_TOTAL(state, total) {
                Vue.set(state, "total", total)
            },
            SET_POST(state, post) {
                Vue.set(state, "post", post)
            }
        },
        getters: {
            siteInfo: state => state.siteInfo,
            tags: state => state.tags,
            limit: state => state.limit,
            list: state => state.list,
            post: state => state.post,
            total: state => state.total
        }
    })
}
