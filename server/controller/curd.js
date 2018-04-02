// #region
// module.exports = (
//     router,
//     modelName,
//     dbService,
//     prefix,
//     { beforeRestful, afterRestful }
// ) => {
//     const modelUrl = `${prefix}/${modelName}`
//     const itemUrl = `${prefix}/${modelName}/:id`

//     router.get(
//         modelUrl,
//         ...beforeRestful,
//         dbService.findAll,
//         ...afterRestful
//     )
//     router.get(
//         itemUrl,
//         ...beforeRestful,
//         dbService.findByQuery,
//         ...afterRestful
//     )
//     router.post(
//         modelUrl,
//         ...beforeRestful,
//         dbService.create,
//         ...afterRestful
//     )
//     router.put(
//         itemUrl,
//         ...beforeRestful,
//         dbService.updateByQuery,
//         ...afterRestful
//     )
//     router.del(
//         itemUrl,
//         ...beforeRestful,
//         dbService.deleteByQuery,
//         ...afterRestful
//     )
// }
// #endregion

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
