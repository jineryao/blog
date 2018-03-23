import Create from "./../components/Create"

export default function(options) {
    return {
        name: `${options.name}-Create-view`,
        render(h) {
            return h(Create, { props: { options: options } })
        }
    }
}
