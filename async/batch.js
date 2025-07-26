const fs = require('fs/promises')
const path = require("path")
const start = Date.now()

console.log(`Start with thread size: ${process.env.UV_THREADPOOL_SIZE ?? 4}`)

const p = path.resolve(__dirname, '..', 'large-file.txt')
const promises = []

for (let i = 0; i < 50; i++) {
  promises.push(fs.readFile(p))
}

Promise.all(promises)
  .then(() => console.log('Successfully read in', Date.now() - start, 'ms'))
