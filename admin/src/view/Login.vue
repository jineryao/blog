<template>
    <el-card class="login">
        <el-input v-model="user.name" placeholder="用户名"></el-input>
        <el-input type="password" v-model="user.password" placeholder="密码" @click="login"></el-input>
        <el-button @click="login">登录</el-button>
    </el-card>
</template>

<script>
import { mapMutations } from "vuex"

export default {
    name: "login",
    data() {
        return {
            user: {
                name: "test",
                password: "111"
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapMutations({
            setUser: "SET_USER"
        }),
        init() {
            if (window.localStorage.getItem("token")) {
                this.$router.push("/home")
            }
        },
        login() {
            let { name, password } = this.user
            if (!name || !password) {
                return this.$prompt.msg_error("请填入用户名,密码")
            }
            this.$api
                .post("/admin/login", this.user)
                .then(res => {
                    if (res.data.status === "success") {
                        this.$prompt.msg_success("登录成功")
                        window.localStorage.setItem("token", res.data.token)
                        this.setUser({ name, password })
                        this.$router.push("/home")
                    } else {
                        return this.$prompt.msg_error("登录失败")
                    }
                })
                .catch(err => this.$prompt.msg_error(err))
        }
    }
}
</script>

<style lang="scss">
@import "./../assets/css/base.scss";

.login {
    @include flex-column;
    position: fixed;
    top: 0;
    bottom: 20%;
    left: 0;
    right: 0;
    margin: auto;
    width: 400px;
    height: 35%;
    align-items: center;
    .logo {
        width: 60px;
    }
    .el-card__body {
        width: 80%;
        flex: 1;
        @include flex-column;
        justify-content: space-around;
        align-items: center;
    }
    .el-button {
        width: 100%;
    }
}
</style>
