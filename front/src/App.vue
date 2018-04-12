<template>
    <div id="app">
        <div class="header">
            <VHeader @open="sidebarSwitch(true)"></VHeader>
        </div>
        <div class="content">
            <div class="sidebar" :class="{ open: sidebarShow, close: close }" @click="sidebarSwitch(false)">
                <VSidebar></VSidebar>
            </div>
            <div class="view">
                <div class="card">
                    <transition name="app-content" mode="out-in">
                        <router-view/>
                    </transition>
                </div>
                <VFooter></VFooter>
            </div>
        </div>
    </div>
</template>

<script>
import VHeader from "./components/VHeader"
import VSidebar from "./components/VSidebar"
import VFooter from "./components/VFooter"

export default {
    name: "App",
    components: {
        VHeader,
        VSidebar,
        VFooter
    },
    data() {
        return {
            sidebarShow: false,
            close: false
        }
    },
    methods: {
        sidebarSwitch(onoff = true) {
            let _this = this
            if (!onoff) {
                setTimeout(() => {
                    _this.close = true
                }, 300)
            } else {
                _this.close = false
            }
            _this.sidebarShow = onoff
        }
    }
}
</script>

<style lang="scss">
@import "./assets/css/base.css";
@import "./assets/css/iconfont.css";
#app {
    position: relative;
    display: flex;
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
    .app-content-enter-active,
    .app-content-leave-active {
        transition: all 0.5s ease-in-out;
    }
    .app-content-enter,
    .app-content-leave-to {
        opacity: 0;
        transform: translateX(5px);
    }
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 46px;
    z-index: 666;
    opacity: 0;
    background: linear-gradient(to right, #eaeaea, #dbdbdb, #f2f2f2, #e1e1e1);
}
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 20vw;
    background: #fff;
}
.view {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    width: calc(100% - 20vw);
    background: #f5f5f5;
}
.sidebar,
.view,
.header {
    transition: all 0.3s ease-in-out;
}
.card {
    padding: 0 40px;
    background: #fff;
    .content {
        padding-bottom: 30px;
        border-bottom: 1px solid #ddd;
    }
}
</style>


<style lang="scss">
@import "./assets/css/media";
</style>
