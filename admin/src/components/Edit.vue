<template>
    <div class="edit">
        <el-table v-if="options.items" class="list" :data="list" stripe style="width: 100%">
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
        <div v-if="options.create" class="create">
            <strong class="title">添加新数据</strong>
            <el-form ref="form" :model="createFrom" label-width="100px">
                <el-form-item v-for="item in options.create" :key="item.label" :label="item.label">
                    <el-input v-model="createFrom[item.prop]" :placeholder="item.placeholder"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "edit",
    props: ["options"],
    data() {
        return {
            createFrom: {}
        }
    },
    computed: {
        list() {
            return this.$store.state.list
        },
        from() {
            return this.$store.state.from
        }
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
        },
        handleEdit(row) {},
        handleDelete(index, row) {}
    }
}
</script>

<style lang="scss" scoped>
.list {
    margin-bottom: 50px;
    .edit-tag {
        margin-right: 5px;
    }
}
.create {
    padding-right: 30vw;
    .title {
        display: block;
        margin-bottom: 20px;
    }
}
</style>
