import Edit from "./../components/Edit"

export default function(options) {
    return {
        name: `${options.name}-Edit-view`,
        render(h) {
            return h(Edit, { props: { options: options } })
        }
    }
}
