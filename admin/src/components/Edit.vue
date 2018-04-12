<template>
    <div class="edit">
        <el-table v-if="options.items" class="list" :data="list.result" stripe style="width: 100%">
            <el-table-column v-for="(item,index) in options.items" :key="index" :label="item.label" :width="item.width">
                <template slot-scope="scope">
                    <span v-if="!item.elTag">{{ scope.row[item.prop] }}</span>
                    <span v-else v-for="tag in scope.row[item.prop]" :key="tag" class="el-tag edit-tag">
                        {{ tag }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="options.items && list.total > 0" @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5" :total="list.total">
        </el-pagination>
        <div v-if="options.create" class="create">
            <strong class="title">添加新数据</strong>
            <el-form ref="form" :model="createFrom" label-width="100px">
                <el-form-item v-for="item in options.create" :key="item.label" :label="item.label">
                    <el-input v-model="createFrom[item.prop]" :placeholder="item.placeholder"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: "edit",
    props: ["options"],
    data() {
        return {
            createFrom: {},
            currentPage: 0
        }
    },
    computed: {
        ...mapGetters(["list", "from", "setting"])
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            let create = this.options.create
            if (create) {
                if (create.from) {
                    Object.assign(this.createFrom, this.from)
                } else {
                    let from = {}
                    create.forEach(item => {
                        from[item.prop] = ""
                    })
                    Object.assign(this.createFrom, from)
                }
            }
            this.featchList()
        },
        handleCurrentChange(page) {
            this.currentPage = page
            this.featchList(page)
        },
        featchList(page = 0, limit = this.setting.limit) {
            let { create, name, items } = this.options
            let select = {}

            page = --page < 0 ? 0 : page

            let options = {
                limit,
                skip: page * limit,
                sort: {
                    createdAt: -1
                }
            }
            if (create) {
                create.forEach(item => (select[item.prop] = 1))
                options.select = select
            }

            this.$store
                .dispatch("findAll", {
                    path: `/${name}`,
                    options
                })
                .then(res => {
                    if (!items && res.total > 0) {
                        this.createFrom = Object.assign(
                            {},
                            this.createFrom,
                            res.result[0]
                        )
                    }
                })
                .catch(err => {
                    this.$promptbox.msg_error(err)
                })
        },
        handleEdit(row) {
            if (this.options.name === "post") {
                this.$store.commit("SET_POST", row)
                this.$router.push("/post/edit")
            } else {
                this.$set(this, "createFrom", row)
            }
        },
        handleDelete(index, row) {
            this.$promptbox
                .confirm(`确认删除此数据?`)
                .then(res => {
                    this.$store
                        .dispatch("delById", {
                            path: `/${this.options.name}`,
                            id: row._id
                        })
                        .then(res => {
                            if (res.status === "success") {
                                this.$promptbox.msg_success("删除成功")
                                this.featchList(this.currentPage)
                            } else {
                                this.$promptbox.msg_error("删除失败")
                            }
                        })
                        .catch(err => {
                            this.$promptbox.msg_error(err)
                        })
                })
                .catch(() => this.$promptbox.msg("已取消"))
        },
        createModel(path, model) {
            this.$store
                .dispatch("create", {
                    path,
                    model
                })
                .then(res => {
                    if (res._id) {
                        this.$promptbox.msg_success("添加成功")
                        this.featchList(this.currentPage)
                    } else {
                        this.$promptbox.msg_error("添加失败")
                    }
                })
                .catch(err => this.$promptbox.msg_error(err))
        },
        updateModel(path, model) {
            this.$store
                .dispatch("updateById", {
                    path,
                    model
                })
                .then(res => {
                    if (res.status === "success") {
                        this.$promptbox.msg_success("修改成功")
                        this.featchList(this.currentPage)
                    } else {
                        this.$promptbox.msg_error("修改失败")
                    }
                })
                .catch(err => this.$promptbox.msg_error(err))
        },
        submit() {
            let model = this.createFrom
            let path = `/${this.options.name}`
            if (model._id) {
                this.updateModel(path, model)
            } else {
                this.createModel(path, model)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    .edit-tag {
        margin-right: 5px;
    }
}
.el-pagination {
    margin: 20px 0;
}
.create {
    padding-right: 30vw;
    .title {
        display: block;
        margin-bottom: 20px;
    }
}
</style>
