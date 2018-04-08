module.exports = ({ service, plugins }) => {
    let { beforeRestful, afterRestful } = plugins

    return {
        uploadImg: [
            ...beforeRestful,
            ...service.multer,
            ...afterRestful
        ]
    }
}
