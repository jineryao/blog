<template>
    <el-form ref="form" :model="from" label-width="80px">
        <el-row>
            <el-form-item label="操作">
                <div class="flex-row">
                    <el-button type="primary" plain @click.native="submit">提交文章</el-button>
                    <div class="date-col">
                        <span>创建日期:</span>
                        <el-date-picker v-model="from.createdAt" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="date-col">
                        <span>修改日期:</span>
                        <el-date-picker v-model="from.updatedAt" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                </div>
            </el-form-item>
            <div class="flex-row">
                <div class="hear-info">
                    <el-form-item label="标题">
                        <el-input v-model="from.title"></el-input>
                    </el-form-item>
                    <el-form-item label="路径">
                        <el-input v-model="from.pathName"></el-input>
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-select class="tags-select" v-model="from.tags" multiple placeholder="请选择">
                            <el-option v-for="(tag,index) in tags" :key="index" :label="tag" :value="tag">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="summary">
                    <el-form-item label="摘要">
                        <el-input class="textarea" type="textarea" v-model="from.summary"></el-input>
                    </el-form-item>
                </div>
            </div>
            <el-form-item label="内容">
                <Markdown :value="from" ref="markdown"></Markdown>
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
                title: "",
                pathName: "",
                createdAt: "",
                updatedAt: "",
                tags: [],
                summary: "",
                toc: "",
                markdownToc: "",
                content: "",
                markdownContent: ""
            }
        }
    },
    computed: {
        tags() {
            return this.$store.state.tags
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.$store.dispatch("fetchTags")
        },
        submit() {
            let mdValue = this.$refs.markdown.getValue()
            let from = Object.assign({}, this.from, mdValue)
            console.log(from)
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
.hear-info {
    width: 45%;
}
.summary {
    flex: 1;
    textarea {
        height: 162px;
        outline: none;
        resize: none;
    }
}
</style>
