const { build } = require('esbuild')
const servor = require('servor')
const { name } = require('../package.json')
const config = require('../esbuild.config.json')
const { copyPublic } = require('../plugins/copy-public')

const serveBuild = async () => {
    const { root, protocol, port, ips, url } = await servor({ 
        root:'./build',
        port: 8080,
        reload: true,
        static: true,
        module: false,
        fallback:'index.html',
        credentials: null,
        inject:''
    })
    const messages = [
        `You can now view ${name} in the browser\n`,
        `🗂  Serving:\t${root}`,
        `🏡 Local:\t${url}`,
        ...ips.map(ip => `🌎 Public:\t${protocol}://${ip}:${port}`),
    ]
    console.clear()
    console.log(messages.join('\n  '))
}

(async () => {
    try{
        copyPublic()
        await build({
            ...config,
            watch: {
                onRebuild(error) {
                    if (error) return console.error('watch build failed:', error)
                },
            },
        })
        serveBuild()
    }
    catch(error){
        process.exit(1)
    }
})()
