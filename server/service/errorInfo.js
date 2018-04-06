// server 信息汇总
const infoSetting = (status, message) => {
    return { status, message }
}
module.exports = {
    LOGIN_FAIL: infoSetting("fail", "登陆失败,无效的用户名/密码"),
    TOKEN_GET_FAIL: infoSetting("fail", "Token获取失败, 重新登陆"),
    TOKEN_VERFIY_FAIL: infoSetting("fail", "Token无效, 重新登陆"),
    TOKEN_DEL_SUCCESS: infoSetting("success", "Token已删除")
}
