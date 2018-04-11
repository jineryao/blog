import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        list: {
            result: [],
            total: 0
        },
        listSetting: {
            limit: 5
        },
        tags: [],
        post: null
    },
    actions: {
        create({ state, commit }, { path, model }) {
            return new Promise((resolve, reject) => {
                Vue.prototype.$api
                    .post(path, model)
                    .then(res => {
                        if (res.data.status === "fail") {
                            return reject(res.data.message)
                        }
                        return resolve(res.data)
                    })
                    .catch(err => reject(err))
            })
        },
        findAll({ state, commit }, { path, options }) {
            return new Promise((resolve, reject) => {
                Vue.prototype.$api
                    .get(path, { params: options })
                    .then(res => {
                        if (res.data.status === "fail") {
                            return reject(res.data.message)
                        }
                        commit("SET_LIST", res.data)
                        resolve(res.data)
                    })
                    .catch(err => reject(err))
            })
        },
        delById({ state, commit }, { path, id }) {
            return new Promise((resolve, reject) => {
                Vue.prototype.$api
                    .delete(`${path}/${id}`)
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => reject(err))
            })
        },
        updateById({ state, commit }, { path, model }) {
            return new Promise((resolve, reject) => {
                Vue.prototype.$api
                    .put(`${path}/${model._id}`, model)
                    .then(res => {
                        resolve(res.data)
                    })
                    .catch(err => reject(err))
            })
        },
        fetchTags({ state, commit }) {
            return new Promise((resolve, reject) => {
                Vue.prototype.$api
                    .get("/tag")
                    .then(res => {
                        if (res.data.result) {
                            let tags = res.data.result.map(tag => tag.tag)
                            commit("SET_TAGS", tags)
                            resolve(res.data)
                        }
                    })
                    .catch(err => reject(err))
            })
        }
    },
    mutations: {
        SET_USER(state, user) {
            Vue.set(state, "user", user)
        },
        SET_LIST(state, { result = [], total = 0 }) {
            Vue.set(state.list, "result", result)
            Vue.set(state.list, "total", total)
        },
        SET_TAGS(state, data) {
            Vue.set(state, "tags", data)
        },
        SET_POST(state, data) {
            Vue.set(state, "post", data)
        }
    },
    getters: {
        user: state => state.user,
        list: state => state.list,
        setting: state => state.listSetting,
        post: state => state.post,
        tags: state => state.tags
    }
})
