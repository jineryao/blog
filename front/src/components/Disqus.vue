<template>
    <div id="disqus_thread"></div>
</template>

<script>
export default {
    name: "disqus_thread",
    computed: {
        shortName() {
            return this.$store.getters.setting.shortName || ""
        }
    },
    components: {
        identifier() {
            return this.$route.path || window.location.pathname
        }
    },
    mounted() {
        if (window.DISQUS) {
            this.reset(window.DISQUS)
            return
        }
        this.init()
    },
    methods: {
        reset(dsq) {
            const identifier = this.identifier
            dsq.reset({
                reload: true,
                config: function() {
                    this.page.identifier = identifier
                }
            })
        },
        init() {
            const identifier = this.identifier
            window.disqus_config = function() {
                this.page.identifier = identifier
            }
            setTimeout(() => {
                const d = document
                let s = d.createElement("script")
                s.type = "text/javascript"
                s.async = true
                s.setAttribute("data-timestamp", +new Date())
                s.src = `https://${this.shortName}.disqus.com/embed.js`
                ;(d.head || d.body).appendChild(s)
            }, 0)
        }
    }
}
</script>

