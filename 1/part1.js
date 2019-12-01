const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const data = input.split('\n').map(x => parseInt(x.trim()))

let sum = 0;

data.forEach(x => {
    sum += Math.floor(x/3) - 2
})

console.log('sum', sum)
