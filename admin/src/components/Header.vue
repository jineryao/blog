<template>
    <div class="v-header">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu default-active="1" mode="horizontal" class="el-menu-vertical-demo" :unique-opened="true" theme="dark" @select="handleSelect">
                    <el-submenu index="1" class="v-submenu">
                        <template slot="title">
                            <span class="v-subtitle">{{displayName === -1 ? '未登录' : displayName}}</span>
                        </template>
                        <el-menu-item index="1-1">修改密码</el-menu-item>
                        <el-menu-item index="1-2">退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "v-header",
    data() {
        return {
            title: ""
        }
    },
    computed: {
        displayName() {
            return -1
        }
    },
    methods: {
        handleSelect(index, indexPath) {
            if (index === "1-1") {
                this.$router.push({
                    name: "userEdit"
                })
            } else if (index === "1-2") {
                this.$router.push({
                    name: "logout"
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
    position: relative;
    left: 20px;
    float: left;
    z-index: 1;
    line-height: 60px;
    font-size: 14px;
}
li.el-submenu {
    float: right;
}
.el-menu-vertical-demo {
    background: #666;
}
</style>
