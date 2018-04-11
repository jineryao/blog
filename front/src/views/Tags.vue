<template>
    <div id="tags">
        <h2>标签</h2>
        <div class="tags-content">
            <router-link class="tag" v-for="key in sortKeys(tags)" :key="key" :to="`/tag/${key}`">
                {{key}}({{tags[key]}})
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "tags",
    computed: {
        tags() {
            return this.$store.getters.tags
        }
    },
    asyncData({ store, commit }) {
        return store.dispatch("FETCH_TAGS", {
            options: {
                select: {
                    tags: 1,
                    _id: 0
                },
                conditions: {
                    isPublic: true
                }
            }
        })
    },
    methods: {
        sortKeys(obj) {
            return Object.keys(obj).sort((a, b) => obj[b] - obj[a])
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/setting";
#tags {
    padding-top: 30px;
    .tags-content {
        @include flex-row;
        flex-wrap: wrap;
        padding: 30px 0;
        border-bottom: 1px solid #ddd;
    }
    .tag {
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 7px 13px;
        color: $blue;
        font-size: 0.8em;
        border: 1px solid $blue;
        border-radius: 4px;
    }
}
</style>
