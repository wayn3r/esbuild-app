const { build } = require('esbuild')

/**
 * --asset-names=static/[name].[hash]
 * --chunk-names=static/js/main.chunck.[hash]
 * --entry-names=[dir]/[name]-[hash]
 */
const handleErrors = () => process.exit(1)
build({
    bundle: true,
    entryPoints: {
        'static/js/main.chunck': './src/index.js'
    },
    inject: ['./config/runtime-jsx.js'],
    splitting: true,
    outdir: 'build',
    loader: {
        '.js': 'jsx',
        '.png': 'file',
        '.jpg': 'file',
    },
    minify: true,
    format: 'esm',
    // drop: ['debugger', 'console'],
    assetNames: 'static/[name].[hash]',
}).catch(handleErrors)