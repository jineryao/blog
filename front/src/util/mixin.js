export default {
    // beforeMount() {
    //     const { asyncData } = this.$options
    //     if (asyncData) {
    //         this.dataPromise = asyncData({
    //             store: this.$store,
    //             route: this.$route
    //         })
    //     }
    // },
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options

        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            })
                .then(next)
                .catch(next)
        } else {
            next()
        }
    },
    filters: {
        timeFormat(date) {
            return new Date(date).toLocaleString("CN", { hour12: false })
        }
    }
}
