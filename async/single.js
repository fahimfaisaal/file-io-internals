const fs = require('fs')
const path = require('path')

console.log(`Start with thread size: ${process.env.UV_THREADPOOL_SIZE ?? 4}`)
const p = path.resolve(__dirname, '..', 'large-file.txt')

console.time('File Read')
fs.readFile(p, 'utf-8', () => {
  console.timeEnd('File Read')
})

// command: strace -f -o ./async/single.txt node async/single.js
