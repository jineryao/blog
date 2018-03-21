import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        list: [{
            title: "title",
            pathName: "vue-title",
            category: "前端",
            tags: ["测试", "js"],
            id: 1
        }]
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
