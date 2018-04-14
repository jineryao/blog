<template>
    <div id="toc">
        <p class="toc-title">
            <strong>文章目录</strong>
        </p>
        <div class="toc-content" v-html="toc"></div>
    </div>
</template>

<script>
export default {
    name: "toc",
    props: ["toc"]
}
</script>

<style lang="scss">
#toc {
    float: right;
    margin-left: 20px;
    padding: 5px 10px;
    max-width: 260px;
    font-size: 14px;
    border: 1px solid #e2e2e2;
    .toc-title {
        margin: 0;
        padding-bottom: 5px;
        border-bottom: 1px solid #e2e2e2;
    }
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
        font-weight: normal;
    }
}
</style>


