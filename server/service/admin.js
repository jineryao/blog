module.exports = () => {
    return {
        async verfiyAdmin(ctx, next) {
            let { receipt, models, token, redis } = ctx._service
            try {
                let { name, password } = ctx.request.body

                let result = await models.user.find({ name }).exec()
                const LOGIN_FAIL = receipt.LOGIN_FAIL

                if (!result.length) return (ctx.body = LOGIN_FAIL)
                result = result[0]
                const reqPwd = ctx._utils.crypto.dataCrypto(
                    password,
                    result.passkey
                )

                if (result.password !== reqPwd.hash)
                    return (ctx.body = LOGIN_FAIL)
                const tokenInfo = token.createToken({ id: result.id })

                redis.set("token", tokenInfo, "EX", token.expiresIn)

                return (ctx.body = {
                    status: "success",
                    token: tokenInfo
                })
            } catch (err) {
                return (ctx.body = receipt.LOGIN_FAIL)
            }
        },
        async singout(ctx, next) {
            try {
                const token = ctx.headers["authorization"]
                const receipt = ctx._service.receipt

                if (!token) return (ctx.body = receipt.TOKEN_GET_FAIL)

                const result = ctx._service.token.verfiyToken(token)
                if (result) {
                    await redis.del("token")
                    return (ctx.body = receipt.TOKEN_DEL_SUCCESS)
                } else {
                    return (ctx.body = receipt.TOKEN_VERFIY_FAIL)
                }
            } catch (err) {
                ctx._service.log.info(err)
                return (ctx.body = err)
            }
        }
    }
}
