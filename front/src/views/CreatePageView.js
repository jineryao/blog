import Page from "./BlogPage"

export default function(name = null) {
    return {
        name: `${ name || "generate" }-view`,
        asyncData({ store, route }) {
            let pathName = route.params.pathName || "404"
            if (pathName === "404") {
                store.commit("SET_POST", store.state.$404)
            }
            return store.dispatch("FETCH_POST", { pathName })
        },
        render(h) {
            return h(Page)
        }
    }
}
