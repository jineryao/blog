<template>
    <article class="blog-summary">
        <Card>
            <div class="head">
                <h1 class="title">
                    <router-link :to="{name: 'post', params: {pathName: item.pathName}}">
                        {{ item.title }}
                    </router-link>
                </h1>
                <div class="date">
                    <i class="iconfont icon-time"></i>
                    {{ item.createAt }}
                </div>
            </div>
            <div class="entry-content" v-html="item.summary"></div>
            <router-link class="more" :to="{name: 'post', params: {pathName: item.pathName}}">
                阅读更多&nbsp;»
            </router-link>
        </Card>
    </article>
</template>

<script>
import Card from "./Card"
export default {
    name: "blog-summary",
    components: {
        Card
    },
    props: {
        item: {
            type: Object,
            // required: true,
            default() {
                return {
                    title: "title",
                    createAt: "2018-02-05 12:00:00",
                    summary: "少时诵诗书",
                    pathName: "--"
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/setting.scss";
.blog-summary {
    .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .date {
            font-size: 0.9em;
        }
        .title a {
            font-size: 2em;
        }
    }
    .entry-content {
        margin: 25px 0;
    }
    .more {
        display: block;
        color: $blue;
    }
}
</style>

