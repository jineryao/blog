<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="路径">
            <el-input v-model="form.pathName"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <Markdown value=""></Markdown>
        </el-form-item>
    </el-form>
</template>

<script>
import Markdown from "./Markdown"

export default {
    name: "post",
    components: {
        Markdown
    },
    props: ["options"],
    data() {
        return {
            form: {
                title: "name",
                pathName: "path-name"
            }
        }
    }
}
</script>
