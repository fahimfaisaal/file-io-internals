const fs = require('fs')
const path = require('path')

console.log(`Start with thread size: ${process.env.UV_THREADPOOL_SIZE ?? 4}`)
const p = path.resolve(__dirname, '..', 'large-file.txt')

console.time('File Read')
for (let i = 0; i < 50; i++) {
  fs.readFileSync(p)
}
console.timeEnd('File Read')

