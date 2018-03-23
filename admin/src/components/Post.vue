<template>
    <el-form ref="form" :model="from" label-width="80px">
        <el-row>
            <el-form-item label="操作">
                <div class="flex-row">
                    <el-button type="primary" plain @click.native="submit">提交文章</el-button>
                    <div class="date-col">
                        <span>创建日期:</span>
                        <el-date-picker v-model="from.createAt" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="date-col">
                        <span>修改日期:</span>
                        <el-date-picker v-model="from.updateAt" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="标签">
                <el-select class="tags-select" v-model="from.tags" multiple placeholder="请选择">
                    <el-option v-for="(tag,index) in tags" :key="index" :label="tag" :value="tag">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="from.title"></el-input>
            </el-form-item>
            <el-form-item label="路径">
                <el-input v-model="from.pathName"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <Markdown value=""></Markdown>
            </el-form-item>
        </el-row>
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
            from: {
                title: "name",
                pathName: "path-name",
                createAt: "",
                updateAt: "",
                tags: [],
                value: ""
            }
        }
    },
    computed: {
        tags() {
            return this.$store.state.tags
        }
    },
    methods: {
        submit() {
            console.log(this.from);
        }
    }
}
</script>

<style lang="scss">
@import "./../assets/css/base.scss";
.date-col {
    color: #606266;
    margin-left: 20px;
}
.tags-select {
    width: 100%;
}
</style>

