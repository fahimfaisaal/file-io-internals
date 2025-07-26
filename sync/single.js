const fs = require('fs')
const path = require('path')

const p = path.resolve(__dirname, '..', 'large-file.txt')

console.time('File read')
fs.readFileSync(p)
console.timeEnd('File read')

