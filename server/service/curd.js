module.exports = model => {
    return {
        async create(ctx, next) {
            console.log("create")
        },
        async findAll(ctx, next) {
            ctx.body = "findAll"
        },
        async findByQuery(ctx, next) {
            console.log("findByQuery")
        },
        async deleteByQuery(ctx, next) {
            console.log("deleteByQuery")
        },
        async updateByQuery(ctx, next) {
            console.log("updateByQuery")
        }
    }
}
