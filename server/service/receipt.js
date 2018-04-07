/**
 * server 回执信息汇总
 */

const merge = (status, message) => {
    return { status, message }
}

module.exports = {
    LOGIN_FAIL: merge("fail", "登陆失败,无效的用户名/密码"),
    TOKEN_GET_FAIL: merge("fail", "Token获取失败"),
    TOKEN_VERFIY_FAIL: merge("fail", "Token无效"),
    TOKEN_DEL_SUCCESS: merge("success", "Token已删除")
}
