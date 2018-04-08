module.exports = model => {
    return {
        async create(ctx, next) {
            try {
                const result = await model.create(ctx.request.body)
                ctx.status = 201
                return (ctx.body = result)
            } catch (error) {
                return (ctx.body = error)
            }
        },
        async findAll(ctx, next) {
            try {
                let conditions = {}
                let select = {}
                let query = ctx.request.query
                if (query.conditions) {
                    conditions = JSON.parse(query.conditions)
                }
                let builder = model.find(conditions)
                let total = await model
                    .find(conditions)
                    .count()
                    .exec()

                if (query.select) {
                    select = JSON.parse(query.select)
                    builder = builder.select(select)
                }

                ;["limit", "skip", "sort", "count"].forEach(key => {
                    if (query[key]) {
                        let arg = query[key]
                        if (key === "limit" || key === "skip") {
                            arg = parseInt(arg)
                        }
                        if (key === "sort" && typeof arg === "string") {
                            arg = JSON.parse(arg)
                        }
                        if (key !== "count") builder[key](arg)
                        else builder[key]()
                    }
                })
                const result = await builder.exec()
                return (ctx.body = { total, result })
            } catch (error) {
                return (ctx.body = error)
            }
        },
        async findByQuery(ctx, next) {
            console.log("findByQuery")
            ctx.body = "findByQuery"
        },
        async deleteByQuery(ctx, next) {
            try {
                const result = await model
                    .findByIdAndRemove(ctx.params.id)
                    .exec()
                return (ctx.body = {
                    status: "success",
                    result
                })
            } catch (error) {
                return (ctx.body = error)
            }
        },
        async updateByQuery(ctx, next) {
            try {
                const result = await model
                    .findByIdAndUpdate(
                        { _id: ctx.params.id },
                        ctx.request.body,
                        { new: true }
                    )
                    .exec()
                return (ctx.body = {
                    status: "success",
                    result
                })
            } catch (error) {
                return (ctx.body = error)
            }
        }
    }
}
