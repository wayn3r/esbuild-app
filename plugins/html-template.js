const fs = require('fs')
const { copyDir } = require('../plugins/copy-public')

const html = { content: null }
const getIndexHtml = () => {
    const { content } = html
    if(content) return content

    const indexHtml = fs.readFileSync('./build/index.html', { encoding: 'utf8' })
    html.content = indexHtml
    return indexHtml
}

const addLinks = cssFiles => {
    const links = cssFiles.map(css => `    <link rel="stylesheet" href="${css}">`).join('\n')
    const content = getIndexHtml()
    return html.content = content.replace(/(?<=<head>)(.|\s)*(?=<\/head>)/gi, '$&' + links + '\n')
}

const addScripts = jsFiles => {
    const scripts = jsFiles.map(js => `    <script defer src="${js}"></script>`).join('\n')
    const content = getIndexHtml()
    return html.content = content.replace(/(?<=<head>)(.|\s)*(?=<\/head>)/gi, '$&' + scripts + '\n')
}

const setIndexHtml = () => {
    const content = getIndexHtml()
    fs.writeFileSync('./build/index.html', content, { encoding: 'utf8' })
}
const htmlTemplate = {
    name: 'html-template',
    setup(build){
        const { outdir } = build.initialOptions
        copyDir('./public', outdir)
        build.onEnd(result => {
            const { outputs } = result.metafile || {}
            console.log(outputs)
            if(!outputs) return
            const js = []
            const css = []
            for(const filename in outputs) {
               
                if(/\.js$/i.test(filename)){
                    const relative = filename.replace(outdir, '.')
                    js.push(relative)
                }
                if(/\.css$/i.test(filename)){
                    const relative = filename.replace(outdir, '.')
                    css.push(relative)
                }
            }
            addLinks(css)
            addScripts(js)
            setIndexHtml()

        })
    }
}

module.exports = {
    htmlTemplate
}