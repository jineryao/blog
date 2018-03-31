// orm model
module.exports = {
    post: {
        title: String,
        pathName: String,
        summary: String,
        toc: String,
        markdownToc: String,
        content: String,
        markdownContent: String,
        tags: Array,
        createdAt: Date,
        updatedAt: Date,
        isPublic: { type: Boolean, default: true },
        allowComment: { type: Boolean, default: true }
    },
    tag: {
        tag: String,
        pathName: String
    },
    user: {
        name: String,
        displayName: String,
        password: String,
        email: String
    }
}
