<template>
    <el-table class="list" :data="list" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="pathName" label="路径" width="180">
        </el-table-column>
        <el-table-column prop="category" label="分类" width="180">
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="180">
            <template slot-scope="scope">
                <el-tag v-for="tag in scope.row.tags" :key="tag">{{ tag }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: "list",
    props: ["options"],
    computed: {
        list() {
            return this.$store.state.list
        }
    },
    created() {
        console.log("list 开启")
    },
    methods: {
        handleEdit(row) {},
        handleDelete(index, row) {}
    }
}
</script>

<style>
.cell {
    text-align: left;
}
.el-tag {
    margin-right: 5px;
}
</style>
