<template>
    <nav id="sidebar">
        <div class="user">
            <router-link to="/" class="avater-wrap">
                <img :src="siteInfo.avatar" alt="头像" class="avatar">
            </router-link>
            <p class="title">
                {{ siteInfo.title }}
            </p>
        </div>
        <div class="btns">
            <router-link class="btn" v-for="btn in siteInfo.menu" :key="btn.label" :to="btn.path">
                <i :class="['iconfont', btn.type ]"></i>{{ btn.label }}
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: "sidebar",
    computed: {
        siteInfo() {
            return this.$store.getters.siteInfo
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/setting.scss";
#sidebar,
.user,
.btns {
    @include flex-column;
}
#sidebar {
    width: 100%;
    height: 100vh;
    .iconfont {
        font-size: 18px;
        margin-right: 15px;
    }
    .user {
        margin-bottom: 5vh;
        padding-top: 12vh;
        position: relative;
        align-items: center;
        &::after {
            z-index: -1;
            position: absolute;
            top: 0;
            display: block;
            content: "";
            width: 100%;
            height: 22vh;
            background: rgba(#4d4d4d, 1);
        }
    }
    .avater-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 19.5vh;
        height: 19.5vh;
        border-radius: 50%;
        background: #fff;
    }
    .avatar {
        width: 90%;
        height: 90%;
        border-radius: 50%;
        object-fit: cover;
        object-position: 0;
    }
    .title {
        font-size: 1.8em;
    }
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 7vh;
        text-align: center;
    }
}
</style>

