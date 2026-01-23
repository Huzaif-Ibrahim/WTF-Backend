const fs = require('fs')

const readStream = fs.createReadStream('./read.txt', {
    encoding: 'utf-8',
    highWaterMark: 1
})
const writeStream = fs.createWriteStream('./input.txt', 'utf-8')

readStream.pipe(writeStream)

readStream.on('data', (data) => {
    console.log(data.length)
})

readStream.on('end', () => {
    console.log('File read completed!')
})

writeStream.on('finish', () => {
    console.log('File write completed!')
})

readStream.on('error', () => {
    console.log('Error while reading file!')
})

writeStream.on('error', () => {
    console.log('Error while writing file!')
})

