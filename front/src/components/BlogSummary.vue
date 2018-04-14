<template>
    <article class="blog-summary">
        <div class="head">
            <h2 class="title">
                <router-link :to="{name: 'post', params: {pathName: item.pathName}}">
                    {{ item.title }}
                </router-link>
            </h2>
            <div class="date">
                <i class="iconfont icon-time"></i>
                {{ item.createdAt | timeFormat }}
            </div>
        </div>
        <div class="entry-content" v-html="item.summary"></div>
        <router-link class="more" :to="{name: 'post', params: {pathName: item.pathName}}">
            阅读更多&nbsp;»
        </router-link>
    </article>
</template>

<script>
export default {
    name: "blog-summary",
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    filter: {},
    methods: {
        timeShow(date) {
            return new Date(date).toLocaleDateString()
        }
    }
}
</script>

<style lang="scss">
@import "./../assets/css/setting.scss";

.blog-summary {
    padding: 30px 0;
    border-bottom: 1px solid #ddd;
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .date {
            font-size: 0.9em;
        }
        .title a {
            font-size: 1.1em;
        }
    }
    .entry-content {
        margin: $spacing 0;
        ul {
            margin: 0 0.5em 0 1.5em;
        }
    }
    .more {
        color: $blue;
    }
}
</style>

