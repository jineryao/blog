import Page from "./BlogPage"

export default function(name, pathName = null) {
    return {
        name: `${name}-view`,
        asyncData({ store, route }) {
            pathName = route.params.pathName || pathName
            return store.dispatch("FETCH_POST", { pathName })
        },
        render(h) {
            return h(Page)
        }
    }
}
