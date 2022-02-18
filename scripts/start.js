const { build } = require('esbuild')
const servor = require('servor')
const config = require('../config/esbuild')
const { name } = require('../package.json')

let serverInfo = {
    root:'', 
    protocol:'', 
    port:'', 
    ips:'', 
    url:''
}
const buildWorksMessage = ({ root, protocol, port, ips, url } = serverInfo) => {
    const messages = [
        `You can now view ${name} in the browser\n`,
        `🗂  Serving:\t${root}`,
        `🏡 Local:\t${url}`,
        ...ips.map(ip => `🌎 Public:\t${protocol}://${ip}:${port}`),
    ]
    console.clear()
    console.log(messages.join('\n  '))
}
const serveBuild = async () => {
    try{
        serverInfo = await servor({ 
            root:'./build',
            port: 8080,
            reload: true,
            static: true,
            module: false,
            fallback:'index.html',
            credentials: null,
            inject:''
        })
       
        buildWorksMessage( serverInfo )
    } catch(err){
        console.error(err)
    }
}

(async () => {
    try{
        await build({
            ...config,
            watch: {

                onRebuild(error){
                    console.clear()
                    if(!error) {
                        return buildWorksMessage( serverInfo )
                    }

                    console.log(error.errors)
                }
            },
        })
        serveBuild()
    }
    catch(error){
        process.exit(1)
    }
})()
