<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App"
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
