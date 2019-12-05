const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const [ lowerLimit, upperLimit ] = input.trim().split('-').map(x => parseInt(x.trim()))

const DOUBLE_DIGITS = ['00','11','22','33','44','55','66','77','88','99']

function isSixDigits(number) {
    return 100000 <= number && number <= 999999
}

function hasDoubleDigit(number) {
    const str = '' + number
    return DOUBLE_DIGITS.some(pair => {
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

let possiblePasswords = []

for ( let possiblePassword = lowerLimit ; possiblePassword <= upperLimit ; possiblePassword++ ) {
    if (
        isSixDigits(possiblePassword) &&
        hasDoubleDigit(possiblePassword) &&
        onlyIncreasingDigits(possiblePassword)
    ) {
        possiblePasswords.push(possiblePassword)
    }
}

function doubleDigitNotPartOfLargerGroupOfMatchingDigits (number) {
    const str = '' + number
    const doubleDigits = DOUBLE_DIGITS.filter(pair => {
        return str.indexOf(pair) >= 0
    })
    return doubleDigits.some(pair => {
        return pair !== str.substr(str.indexOf(pair)+1,2)
    })
}

possiblePasswords = possiblePasswords.filter(possiblePassword => {
    return doubleDigitNotPartOfLargerGroupOfMatchingDigits(possiblePassword)
})

console.log('possiblePasswords', possiblePasswords.length)
