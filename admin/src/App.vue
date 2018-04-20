<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App",
    mounted() {
        this.init()
    },
    methods: {
        init() {
            if (window.localStorage.getItem("token")) {
                let last = window.localStorage.getItem("LastLoginTime")
                if (new Date().getTime() - last < 3600000) {
                    this.$router.push("/home")
                    return
                }
            }
            this.$router.push("/")
        }
    }
}
</script>

<style>
@import "./assets/css/base.scss";
@import "./assets/css/highlight.css";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    color: #2c3e50;
}
</style>
