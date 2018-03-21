export default {
    _loading: null,
    message(message = "已取消") {
        this.$message({
            type: "info",
            message
        })
    },
    message_success(message = "已成功") {
        this.$message({
            type: "success",
            message
        })
    },
    message_error(message = "错误") {
        this.$message({
            type: "error",
            message
        })
    },
    message_warning(message = "warning") {
        this.$message({
            type: "warning",
            message
        })
    },
    confirm(message, warning = "提示") {
        return new Promise((resolve, reject) => {
            this.$confirm(message, warning, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            })
                .then(() => {
                    resolve()
                })
                .catch(() => {
                    reject(new Error("已取消"))
                })
        })
    },
    loading_open(text = "loading") {
        this._loading = this.$loading({
            lock: true,
            text,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        })
    },
    loading_close() {
        this._loading && this._loading.close()
    }
}
