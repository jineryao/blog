module.exports = () => {
    return {
        async verfiyAdmin(ctx, next) {
            let { errorInfo, models, token } = ctx._service
            try {
                let { name, password } = ctx.request.body

                let result = await models.user.find({ name }).exec()
                const LOGIN_FAIL = errorInfo.LOGIN_FAIL

                if (!result.length) return (ctx.body = LOGIN_FAIL)
                result = result[0]
                const reqPwd = ctx._utils.crypto.dataCrypto(
                    password,
                    result.passkey
                )

                if (result.password !== reqPwd.hash)
                    return (ctx.body = LOGIN_FAIL)
                const tokenInfo = token.createToken({ id: result.id })

                // redis.set(
                //     "token",
                //     token,
                //     "EX",
                //     tokenService.expiresIn,
                //     () => {}
                // )

                return (ctx.body = {
                    status: "success",
                    token: tokenInfo
                })
            } catch (err) {
                return (ctx.body = errorInfo.LOGIN_FAIL)
            }
        },
        async singout(ctx, next) {}
    }
}
