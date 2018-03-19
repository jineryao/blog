<template>
    <div id="app">
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="view">
            <router-view/>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Sidebar from "./views/Sidebar"
import Footer from "./components/Footer"

export default {
    name: "App",
    components: {
        Sidebar, Footer
    }
}
</script>

<style>
@import "./assets/css/base.css";
@import "./assets/css/iconfont.css";

#app {
    position: relative;
    display: flex;
    width: 100%;
    min-height: 100vh;
}
.sidebar {
    width: 20vw;
    min-width: 300px;
}
.view {
    padding: 0 15px;
    flex: 1;
    background: #f5f5f5;
}
</style>
