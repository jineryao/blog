module.exports = ({ router, service, plugins, controller }) => {
    const control = controller.upload({ service, plugins })
    router.post("/upload", ...control.uploadImg)
}
