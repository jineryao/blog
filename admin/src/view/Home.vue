<template>
    <el-container class="home">
        <el-header>
            <VHeader></VHeader>
        </el-header>
        <el-container class="home-container">
            <el-aside width="250px">
                <VSidebar></VSidebar>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import VSidebar from "./../components/Sidebar"
import VHeader from "./../components/Header"

export default {
    name: "home",
    components: { VSidebar, VHeader }
}
</script>

<style lang="scss">
.home {
    position: relative;
    height: 100vh;
    overflow-y: hidden;
    .el-header {
        padding: 0;
        border-bottom: 1px solid #000;
    }
    .el-aside {
        width: 100%;
        height: 100vh;
        background: #d5d5d5;
        border: 1px solid #d5d5d5;
    }
    .el-main {
        overflow-x: hidden;
    }
}
</style>
