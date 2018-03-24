<template>
    <el-row class="sidebar">
        <el-col :span="4" class="full-height" style="overflow-y:auto;">
            <el-menu :router="true" :default-active="fullPath" class="full-height" :unique-opened="true">
                <el-submenu v-for="(item, index) in menu" :key="item.label" :index="`${index}`">
                    <template slot="title">
                        <i :class="`el-icon-${item.icon}`"></i>{{ item.label }}
                    </template>
                    <el-menu-item v-for="subItem in item.subset" :key="subItem.label" :index="subItem.path">
                        {{ subItem.label }}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "sidebar",
    data() {
        return {
            title: "",
            fullPath: "",
            menu: [
                {
                    label: "文章管理",
                    icon: "document",
                    subset: [
                        { path: "/post/list", label: "文章列表" },
                        { path: "/post/edit", label: "添加文章" }
                    ]
                },
                {
                    label: "系统设置",
                    icon: "setting",
                    subset: [
                        { path: "/option/general", label: "基本设置" },
                        { path: "/option/menu", label: "页面列表" },
                        { path: "/option/comment", label: "评论设置" },
                        { path: "/option/tags", label: "标签设置" },
                        { path: "/option/analytic", label: "统计代码" }
                    ]
                }
            ]
        }
    },
    watch: {
        $route: function(router) {
            this.fullPath = router.path
                .split("/")
                .slice(0, 3)
                .join("/")
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 60px;
    .row-bg {
        height: 100%;
    }
}

.full-height {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    background: #eee;
}
</style>
