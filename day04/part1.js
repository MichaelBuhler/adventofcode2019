const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const [ lowerLimit, upperLimit ] = input.trim().split('-').map(x => parseInt(x.trim()))

function isSixDigits(number) {
    return 100000 <= number && number <= 999999
}

function hasDoubleDigit(number) {
    const str = '' + number
    return ['00','11','22','33','44','55','66','77','88','99'].some(pair => {
        return str.indexOf(pair) >= 0
    })
}

function onlyIncreasingDigits (number) {
    const digits = (''+number).split('').map(x => parseInt(x))
    for ( let i = 0 ; i < digits.length-1 ; i++ ) {
        if ( digits[i+1] < digits[i] ) {
            return false
        }
    }
    return true
}

const possiblePasswords = []

for ( let possiblePassword = lowerLimit ; possiblePassword <= upperLimit ; possiblePassword++ ) {
    if (
        isSixDigits(possiblePassword) &&
        hasDoubleDigit(possiblePassword) &&
        onlyIncreasingDigits(possiblePassword)
    ) {
        possiblePasswords.push(possiblePassword)
    }
}

console.log('possiblePasswords', possiblePasswords.length)
