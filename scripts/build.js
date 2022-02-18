
const { build } = require('esbuild')
const config = require('../config/esbuild')
;(async()=>{
    await build(config).catch(() => process.exit(1))
})()