<template>
    <div class="markdown">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#eee" text-color="#606266" active-text-color="#606266">
            <el-menu-item index="1">加粗</el-menu-item>
            <el-menu-item index="2">斜体</el-menu-item>
            <el-menu-item index="3">引用</el-menu-item>
            <el-menu-item index="4">代码段</el-menu-item>
            <el-menu-item index="5">
                摘要
            </el-menu-item>
            <el-menu-item index="6">
                编辑TOC
            </el-menu-item>
            <el-submenu index="7">
                <template slot="title">插入图片</template>
                <el-menu-item index="7-1">
                    上传图片
                </el-menu-item>
                <el-menu-item index="7-2">
                    网络图片
                </el-menu-item>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title">{{labels[mode]}}</template>
                <el-menu-item v-for="(modeVal, modeKey) in modeLabels" :key="modeKey" :index="modeKey">
                    {{labels[modeVal]}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="md-editor" :class="{ mode }">
            <textarea v-if="mode !== 'preview'" ref="markdown" :value="mdContent" @input="handleInput" @keydown.tab.prevent.stop="handleTab" class="md-edit"></textarea>
            <div v-show="mode !== 'edit' && mode !== 'toc'" class="md-preview" v-html="compiledMarkdown"></div>
            <textarea v-if="mode === 'toc'" v-model="tocContent" @keydown.enter.prevent.stop="handleTocEnter" class="md-preview"></textarea>
        </div>
    </div>
</template>

<script>
import _ from "lodash"
import { marked } from "./../util/marked"

export default {
    name: "markdown",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            items: [
                { label: "加粗" },
                { label: "倾斜" },
                { label: "引用" },
                { label: "代码段" },
                {
                    label: "插入图片",
                    submenu: [{ label: "上次图片" }, { label: "网络图片" }]
                },
                { label: "摘要" },
                {
                    label: "编辑模式",
                    submenu: [
                        { label: "编辑模式" },
                        { label: "分屏模式" },
                        { label: "预览模式" }
                    ]
                },
                { label: "编辑TOC" }
            ],
            modeLabels: {
                "8-1": "edit",
                "8-2": "split",
                "8-3": "preview"
            },
            labels: {
                edit: "编辑模式",
                split: "分屏模式",
                preview: "预览模式",
                toc: "TOC模式"
            },
            mode: "edit",
            inputTexts: {
                "1": {
                    text: "**加粗文字**",
                    start: 2,
                    end: 6
                },
                "2": {
                    text: "_斜体文字_",
                    start: 1,
                    end: 5
                },
                "3": {
                    text: "> 引用",
                    start: 3,
                    end: 5
                },
                "4": {
                    text: "```\ncode block\n```",
                    start: 5,
                    end: 15
                },
                "5": {
                    text: "<!--more-->",
                    start: 12,
                    end: 12
                }
            },
            mdContent: "",
            tocContent: "***文章目录***\n* # "
        }
    },
    computed: {
        compiledMarkdown() {
            return marked(this.mdContent.replace(/<!--more-->/g, ""))
        }
    },
    created() {
        let { markdownToc, markdownContent } = this.value
        this.mdContent = markdownContent
        this.tocContent = markdownToc
    },
    methods: {
        handleSelect(key, keyPath) {
            switch (key) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                    let { text, start, end } = this.inputTexts[key]
                    this._preInputText(text, start, end)
                    break
                case "6":
                    this.mode = "toc"
                    break
                case "7-1":
                    break
                case "7-2":
                    this._importImage()
                    break
                case "8-1":
                case "8-2":
                case "8-3":
                    this.mode = this.modeLabels[key]
                    break
            }
        },
        _preInputText(text, preStart, preEnd) {
            let markdown = this.$refs.markdown
            const start = markdown.selectionStart
            const end = markdown.selectionEnd
            const mdContent = this.mdContent
            if (start !== end) {
                const exist = mdContent.slice(start, end)
                text = text.slice(0, preStart) + exist + text.slice(preEnd)
            }
            let input = mdContent.slice(0, start) + text + mdContent.slice(end)
            this.handleInput(input)
        },
        _importImage() {
            this.$prompt("请输入图片的链接", "导入图片链接", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
                .then(({ value }) => {
                    this._preInputText(`![](${value})`, 12, 12)
                    this.$promptbox.msg("已插入图片链接")
                })
                .catch(() => {
                    this.$promptbox.msg("已取消插入图片链接")
                })
        },
        _uploadImage() {
            let path = ""
            //
            this._preInputText(`![](${path})`, 12, 12)
        },
        handleInput: _.debounce(function(e) {
            this.mdContent = typeof e === "string" ? e : e.target.value
        }, 300),
        handleTab() {
            this._preInputText("\t")
        },
        handleTocEnter() {
            this.tocContent += `\n* # `
        },
        getValue() {
            return {
                markdownContent: this.mdContent,
                content: this.compiledMarkdown,
                markdownToc: this.tocContent,
                toc: marked(this.tocContent.replace(/<!--more-->/g, ""))
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.markdown {
    text-align: left;
    border: 1px solid #dcdfe6;
    .el-menu-demo {
        background: #eee;
    }
    .md-editor {
        display: flex;
        width: 100%;
        height: 56vh;
        max-height: auto;
        transition: width 0.3s;
        background-color: #fff;
        position: relative;

        textarea {
            box-sizing: border-box;
            display: block;
            border-style: none;
            resize: none;
            outline: 0;
            width: 100%;
            height: 100%;
            flex: 1;
            padding: 15px 15px 0;
        }

        .md-preview {
            box-sizing: border-box;
            word-wrap: break-word;
            word-break: normal;
            flex: 1;
            height: 100%;
            background-color: #f9fafc;
            border-left: 1px solid #ccc;
            overflow: auto;
            transition: 0.3s;
            padding: 15px 15px 0;
        }
    }
}
</style>
