module.exports = ({ service, model, plugins }) => {
    let admin = service.admin(model)
    let { beforeRestful, afterRestful } = plugins

    return {
        login: [...beforeRestful, admin.verfiyAdmin, ...afterRestful],
        singout: [...beforeRestful, admin.singout, ...afterRestful]
    }
}
