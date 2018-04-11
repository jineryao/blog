<template>
    <footer id="footer" class="inner">
        &copy;&nbsp;2018&nbsp;-&nbsp; {{ siteInfo.title }} &nbsp;-&nbsp;
        <a target=_blank href="https://github.com/jineryao/blog">博客源码</a>
        <br> Powered by&nbsp;
        <a target=_blank href="https://github.com/vuejs/vue">Vue2</a>
        &nbsp;&amp;&nbsp;
        <a target=_blank href="https://github.com/koajs/koa">koa2</a>
    </footer>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: "foot",
    computed: {
        ...mapGetters(["siteInfo"])
    }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/setting.scss";

#footer {
    font-size: .9em;
    line-height: 1.8;
    padding: 15px;
    text-align: center;
    background: #fff;
    a {
        color: $blue;
    }
}
</style>

