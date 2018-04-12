import Marked from "marked"
import hljs from "highlight.js"

const renderer = new Marked.Renderer()
const toc = []

renderer.heading = function(text, level) {
    let slug = text.toLowerCase().replace(/\s+/g, "-")
    toc.push({
        level: level,
        slug: slug,
        title: text
    })
    return `<h${level}><a href='#${slug}' id='${slug}'>${text}</a></h${level}>`
}

Marked.setOptions({
    highlight: function(code, lang) {
        if (hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code).value
        } else {
            return hljs.highlightAuto(code).value
        }
    },
    renderer
})

export function marked(text) {
    let tok = Marked.lexer(text)
    text = Marked.parser(tok).replace(/<pre>/gi, "<pre class='hljs'>")
    return text
}

export function markedToc(content) {
    toc.length = 0
    marked(content)
    return toc
        .map(item => {
            let num = item.level - 1
            return `${" ".repeat(num)} - [${item.title}](#${item.slug})`
        })
        .join("\n")
}
