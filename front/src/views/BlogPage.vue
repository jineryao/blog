<template>
    <section id="blog-page" v-if="post.title">
        <div class="blog-title">
            <h2>{{ post.title }}</h2>
            <span v-if="post.createdAt" class="date">{{ post.createdAt | timeFormat }}</span>
        </div>
        <div class="blog-content">
            <Toc v-if="post.toc" :toc="post.toc"></Toc>
            <div v-html="post.content"></div>
        </div>
        <Disqus v-if="post.allowComment"></Disqus>
    </section>
</template>

<script>
import Disqus from "./../components/Disqus"
import Toc from "./../components/Toc"

export default {
    name: "blog-page",
    props: ["pathName"],
    components: {
        Disqus,
        Toc
    },
    computed: {
        post() {
            return this.$store.getters.post
        }
    }
}
</script>

<style lang="scss">
@import "./../assets/css/setting";

#blog-page {
    padding-top: 30px;
    border-bottom: 1px solid #ddd;
    .blog-title {
        @include flex-row;
        margin-bottom: $spacing;
        justify-content: space-between;
        align-items: center;
    }
    .blog-content {
        padding-bottom: 30px;
    }
    a {
        color: $blue;
    }
    p {
        margin: 15px 0;
    }
    ul {
        margin: 0 0.5em 0 1.5em;
    }
}
</style>


