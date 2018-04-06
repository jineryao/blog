module.exports = ({ service, model, plugins}) => {
    let curd = service.curd(model)
    let { findAll, findByQuery, create, updateByQuery, deleteByQuery } = curd
    let { beforeRestful, afterRestful } = plugins

    return {
        findModel: [...beforeRestful, findAll, ...afterRestful],
        findItem: [...beforeRestful, findByQuery, ...afterRestful],
        create: [...beforeRestful, create, ...afterRestful],
        update: [...beforeRestful, updateByQuery, ...afterRestful],
        del: [...beforeRestful, deleteByQuery, ...afterRestful]
    }
}
