const { htmlTemplate } = require('../plugins/html-template')

const config = {
    metafile: true,
    bundle: true,
    splitting: true,
    minify: true,
    outdir: 'build',
    format: 'esm',
    sourcemap: true,
    entryNames: 'static/[name].[hash]',
    assetNames: 'static/[name].[hash]',
    entryPoints: ['./src/index.js'],
    inject: ['./plugins/runtime-jsx.js'],
    target: ['es2020', 'chrome58'],
    plugins: [htmlTemplate],
    define: {
        'process.env.NODE_ENV': '\'production\''
    },
    loader: {
        '.js': 'jsx',
        '.png': 'file',
        '.jpg': 'file'
    }
}

module.exports = config
