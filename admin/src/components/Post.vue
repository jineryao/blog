<template>
    <div id="post">
        <el-form ref="form" :model="from" label-width="80px">
            <el-row>
                <el-form-item label="操作">
                    <div class="flex-row operating">
                        <el-button type="primary" plain @click.native="submit">提交文章</el-button>

                    </div>
                </el-form-item>
                <div class="flex-row">
                    <div class="operating">
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
                    <div class="operating">
                        <el-form-item>
                            <el-switch class="operating-switch" v-model="from.isPublic" active-text="是否公开">
                            </el-switch>
                            <el-switch class="operating-switch" v-model="from.allowComment" active-text="是否可评论">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="创建日期">
                            <el-date-picker v-model="from.createdAt" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="修改日期">
                            <el-date-picker v-model="from.updatedAt" type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <!-- <el-form-item label="摘要">
                            <el-input class="textarea" type="textarea" v-model="from.summary"></el-input>
                        </el-form-item> -->
                    </div>
                </div>
                <el-form-item label="内容">
                    <Markdown :value="from" ref="markdown"></Markdown>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import Markdown from "./Markdown"
import { mapGetters } from "vuex"

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
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString(),
                tags: [],
                summary: "",
                toc: "",
                markdownToc: "",
                content: "",
                markdownContent: "",
                isPublic: true,
                allowComment: true
            }
        }
    },
    computed: {
        ...mapGetters(["tags", "post"])
    },
    mounted() {
        this.init()
    },
    destroyed() {
        this.$store.commit("SET_POST", null)
    },
    methods: {
        init() {
            this.$store.dispatch("fetchTags")
            let obj = Object.assign({}, this.from, this.post)
            this.from = obj
        },
        submit() {
            let mdValue = this.$refs.markdown.getValue()
            let from = Object.assign({}, this.from, mdValue)

            let method = "create"
            let path = "/post"
            if (from._id) {
                method = "updateById"
            }
            this.$store
                .dispatch(method, {
                    path,
                    model: from
                })
                .then(res => {
                    let msg = method === "create" ? "添加" : "修改"
                    if (res._id || res.status === "success") {
                        this.$promptbox.msg_success(`${msg}成功`)
                        this.$router.push("/post/list")
                    } else if (
                        res.status === "fail" &&
                        res.message.startsWith("Token")
                    ) {
                        this.$promptbox.msg_error(res.message)
                    } else {
                        this.$promptbox.msg_error(`${msg}失败`)
                    }
                })
                .catch(err => this.$promptbox.msg_error(err))
        }
    }
}
</script>

<style lang="scss">
@import "./../assets/css/base.scss";
#post {
    .operating {
        flex: 1;
        align-items: center;
        justify-content: space-between;
        .operating-switch {
            margin-right: 30px;
        }
    }
    .el-date-editor.el-input {
        width: 100%;
    }
    .tags-select {
        width: 100%;
    }
    .summary {
        flex: 1;
        textarea {
            height: 288px;
            outline: none;
            resize: none;
        }
    }
}
</style>
