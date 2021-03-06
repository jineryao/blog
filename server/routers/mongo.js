module.exports = ({ router, service, conf, plugins, controller }) => {
    let { models } = service

    Object.keys(models)
        .map(name => models[name])
        .forEach(model => {
            const modelUrl = `/${model.modelName}`
            const itemUrl = `/${model.modelName}/:id`

            const control = controller.curd({ service, model, plugins })

            router.get(modelUrl, ...control.findModel)
            router.post(modelUrl, ...control.create)
            router.put(itemUrl, ...control.update)
            router.del(itemUrl, ...control.del)
        })
}
