
module.exports = {
    service: true,
    execute: ({ service }) =>
        async function(ctx, next) {
            console.log(ctx._service, this._service, "checkauth")
            next()
        }
}
