const fs = require('fs')

console.log('start')

fs.readFile(`${__dirname}/test-file.txt`, 'utf-8', () => {
    console.log('read file function')
    setTimeout(() => {
        console.log('timer1')
    }, 2000);
    setTimeout(() => {
        console.log('timer2')
    }, 0);
    setImmediate(() => {
        console.log('immediate1')
    })
})

setTimeout(() => {
    console.log('timer3')
}, 0);

setImmediate(() => {
    console.log('immediate2')
})

console.log('end')
