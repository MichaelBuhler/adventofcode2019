const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const data = input.split('\n').map(x => parseInt(x.trim()))

let sum = 0;

function calculateFuelRequirement (mass) {
    const fuel = Math.floor( mass / 3 ) - 2
    if ( fuel < 0 ) return 0
    return fuel + calculateFuelRequirement(fuel)
}

data.forEach(mass => {
    sum += calculateFuelRequirement(mass)
})

console.log('sum', sum)
