const { outdir } = require('../esbuild.config.json') 
const fs = require('fs')
const path = require('path')
const copyDir = (src, dest) => {
    fs.readdir(
        src, 
        { encoding: 'utf-8', withFileTypes: true }, 
        (err, files) => {
            if(err) return
            fs.mkdirSync(dest)
            files.forEach(file => {
                const srcName = path.join(src, file.name)
                const destName = path.join(dest, file.name)
                if(file.isDirectory()){
                    return copyDir(srcName, destName)
                }
                if(file.isFile()){
                    fs.copyFileSync(srcName, destName)
                }
            })
        }
    )
}

fs.rmdirSync('./build', { recursive: true })
module.exports = { copyPublic : () => copyDir('./public', outdir) }