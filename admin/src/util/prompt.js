export default {
    install(Vue, options) {
        const prompt = 2000
        if (!Vue.prototype.$message || !Vue.prototype.$confirm) return
        Vue.prototype.$prompt = {
            _loading: null,
            msg(message = "已取消") {
                Vue.prototype.$message({
                    type: "info",
                    message,
                    prompt
                })
            },
            msg_success(message = "已成功") {
                Vue.prototype.$message({
                    type: "success",
                    message,
                    prompt
                })
            },
            msg_error(message = "错误") {
                Vue.prototype.$message({
                    type: "error",
                    message,
                    prompt
                })
            },
            msg_warning(message = "warning") {
                Vue.prototype.$message({
                    type: "warning",
                    message,
                    prompt
                })
            },
            confirm(message, warning = "提示") {
                return new Promise((resolve, reject) => {
                    Vue.prototype
                        .$confirm(message, warning, {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                            center: true
                        })
                        .then(() => {
                            resolve()
                        })
                        .catch(err => {
                            reject(err)
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
    }
}
