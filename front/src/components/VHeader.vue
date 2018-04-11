<template>
    <header id="v-header">
        <i class="iconfont icon-other icon-btn" @click="open"></i>
        <p class="v-header-title">
            {{ siteInfo.title }}
        </p>
    </header>
</template>

<script>
export default {
    name: "vheader",
    computed: {
        siteInfo() {
            return this.$store.getters.siteInfo
        }
    },
    methods: {
        open() {
            this.$emit("open")
        }
    }
}
</script>

<style lang="scss">
@import "./../assets/css/setting";
#v-header {
    position: relative;
    width: 100%;
    height: 100%;
    .icon-btn {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 15px;
        margin: auto;
        font-size: 2.5em;
        cursor: pointer;
    }
    .v-header-title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
}
</style>


