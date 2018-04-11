<template>
    <section id="tag-page">
        <h2 class="tag-title">
            含有标签&nbsp;
            <p class="tag-name">{{ tag }}</p>&nbsp;的文章
        </h2>
        <BlogSummary v-for="item in list" :key="item._id" :item="item"></BlogSummary>
    </section>
</template>

<script>
import BlogSummary from "./../components/BlogSummary"

export default {
    name: "tag-page",
    components: {
        BlogSummary
    },
    computed: {
        list() {
            return this.$store.getters.list
        },
        tag() {
            return this.$route.params.tag
        }
    },
    asyncData({ store, route }) {
        let tag = route.params.tag || ""
        return store.dispatch("FETCH_ALL", {
            Paging: false,
            path: "/post",
            options: {
                select: {
                    title: 1,
                    summary: 1,
                    pathName: 1,
                    createdAt: 1
                },
                conditions: {
                    isPublic: true,
                    tags: tag
                },
                sort: { createdAt: -1 }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/setting";

#tag-page {
    padding-top: 30px;
    .tag-title {
        @include flex-row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .tag-name {
        color: $blue;
    }
}
</style>


