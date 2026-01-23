// console.log("start");

// setTimeout(() => console.log("timeout"), 0);
// setImmediate(() => console.log("immediate"));

// Promise.resolve().then(() => console.log("promise"));

// process.nextTick(() => console.log("nextTick"));

// console.log("end");





// 2
// function block() {
//   process.nextTick(() => {
//       block()
//       console.log('printing')
//   });
// }

// block();

// setTimeout(() => console.log("timeout"), 1000);





// 3

// const crypto = require("crypto");
// const fs = require('fs')

// process.env.UV_THREADPOOL_SIZE=2

// const writeLargeFile = () => {
//     const stream = fs.createWriteStream('./large-text.txt')

//     for (let i = 1; i < 1000000; i++) {
//         stream.write('Node.js\n')
//     }

//     stream.end()

//     return new Promise((resolve, reject) => {
//         stream.on('finish', () => {
//             return resolve('Written successfully.')
//         })
//         stream.on('error', () => {
//             return reject('An error occured')
//         })
//     })
// }
// writeLargeFile().then((data) => console.log(data)).catch((err) => console.log(err))

// for (let i = 1; i <= 8; i++) {
//   fs.readFile('./large-text.txt', 'utf-8', (err, data) => {
//     if(err) return console.log(err)
//         console.log('data' + i)
//   })
// }




// 4
// const fs = require("fs");

// setTimeout(() => console.log("timeout"), 0);

// const x = fs.readFileSync('./txt.txt', 'utf-8');
// console.log(x)

// console.log("done");




// 5 : CPU Blocking Kills Concurrency

// const http = require("http");

// function heavy() {
//   const end = Date.now() + 3000;
//   while (Date.now() < end) {}
// }

// http.createServer((req, res) => {
//   heavy();
//   console.log('Waiting')
//   res.end("done");
// }).listen(3000);




// 6 : Promise Inside I/O (Microtask Drain)

// const fs = require("fs");

// fs.readFile('./txt.txt', 'utf-8' ,(err,data) => {
//     Promise.resolve().then(() => console.log("promise"));
//     console.log(data);
// });





// 7 : Close Callback Phase
// const net = require("net");

// const server = net.createServer();
// server.listen(3000);

// server.close(() => {
//   console.log("close callback");
// });




// 8
// const fs = require("fs");
// setTimeout(() => console.log("timer"), 0);//3

// setImmediate(() => console.log("immediate"));//5

// Promise.resolve().then(() => console.log("promise"));//2

// process.nextTick(() => console.log("nextTick")); //1

// fs.readFile('txt.txt', () => {
//   console.log("io"); //4
// });


// const fs = require('fs')

// fs.readFile('./text.txt', 'utf-8', (err, data) => {
//     if(err){
//         throw (err)
//     }

//     console.log(data)
// })




const demoObj = {
    '1' : {
        'start':'123',
        'end':'456'
    },
    '2' : {
        'start':'789',
        'end':'101112'
    }
}

const demoObj1 = {
    '1': 'hello',
    '2': 'bye'
}

Object.keys(demoObj1).forEach((key, i, value) => {
    console.log(key, i)
})

