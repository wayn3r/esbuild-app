const fs = require('fs')
const path = require('path')

const copyDir = (src, dest) => {
    fs.rmdirSync(dest, { recursive: true })
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

module.exports = { copyDir }