import List from "./../components/List"

export default function (options) {
    return {
        name: `${options.name}-list-view`,
        render(h) {
            return h(List, { props: { options: options } })
        }
    }
}
