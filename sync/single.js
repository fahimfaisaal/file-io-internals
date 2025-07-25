const fs = require('fs')
const path = require('path')

const p = path.resolve(__dirname, '..', 'large-file.txt')

console.time('File read')
fs.readFileSync(p, 'utf-8')
console.timeEnd('File read')

// command: strace -f -o ./sync/single.txt node sync/single.js
