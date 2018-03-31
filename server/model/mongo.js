// orm model
const post = {
    title: String,
    pathName: String,
    summary: String,
    toc: String,
    markdownToc: String,
    content: String,
    markdownContent: String,
    tags: Array,
    createdAt: String,
    updatedAt: String,
    isPublic: { type: Boolean, default: true },
    allowComment: { type: Boolean, default: true }
}

const tag = {
    tag: String,
    pathName: String
}

const user = {
    name: String,
    displayName: String,
    password: String,
    email: String
}

module.exports = {
    post,
    tag,
    user
}
