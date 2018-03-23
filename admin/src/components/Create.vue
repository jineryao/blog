<template>
    <div class="create">
        <el-input v-for="item in options.items" :key="item.name" v-model="from[item.name]" :placeholder="item.label"></el-input>
        <el-button type="primary" @click.native="onSubmit">提交</el-button>
    </div>
</template>

<script>
export default {
    name: "create",
    props: ["options"],
    data() {
        return {
            from: {}
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const items = this.options.items
            let from = {}
            if (items) {
                items.forEach(item => {
                    from[item.name] = ""
                })
                Object.assign(this.from, from)
            }
            // this.$store.dispatch("fetchCreate").then(data => {})
        },
        onSubmit() {}
    }
}
</script>
