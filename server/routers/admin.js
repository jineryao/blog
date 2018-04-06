module.exports = ({ router, service, conf, plugins, controller }) => {
    let model = service.models.user
    const control = controller.admin({ service, model, plugins })
    router.post("/admin/login", ...control.login)
    router.post("/admin/signout", ...control.singout)
}
