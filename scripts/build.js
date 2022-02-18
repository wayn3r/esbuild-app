
const { build } = require('esbuild')
const config = require('../esbuild.config.json')
const { htmlTemplate } = require('../plugins/html-template')

;(async()=>{
    await build({
        ...config,
        plugins: [htmlTemplate]
    }).catch(() => process.exit(1))

})()