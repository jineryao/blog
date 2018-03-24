import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        list: [
            {
                title: "title",
                pathName: "vue-title",
                tags: ["测试", "js"],
                id: 1
            }
        ],
        tags: ["javascript", "html", "css", "nodejs", "风景", "美食", "闲聊"]
    },
    actions: {
        fetchCreate({ state, commit }, { model }) {}
    },
    mutations: {
        SET_USER(state, { user }) {
            Vue.set(state, "user", user)
        },
        SET_LIST(state, { data }) {
            Vue.set(state, "list", data)
        }
    },
    getters: {
        user: state => state.user,
        list: state => state.list
    }
})
