const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const orbits = input.trim().split('\n').map(x => x.trim())

const bodies = {}

orbits.forEach(orbit => {
    const [ body, satellite ] = orbit.split(')')
    if ( bodies[body] ) {
        bodies[body].push(satellite)
    } else {
        bodies[body] = [ satellite ]
    }
})

let me, santa

function buildMap (bodyName, parent) {
    const obj = {
        name: bodyName,
        depth: parent ? parent.depth + 1 : 0,
        parent
    }
    if (bodies[bodyName]) {
        obj.satellites = bodies[bodyName].map(satelliteName => buildMap(satelliteName, obj))
    }
    if ( bodyName === 'YOU' ) {
        me = obj
    } else if ( bodyName === 'SAN' ) {
        santa = obj
    }
    return obj
}

const map = buildMap('COM')

function getChain (body) {
    if (body.parent) {
        const parentChain = getChain(body.parent)
        return parentChain.concat([body.name])
    } else {
        return [body.name]
    }
}

const meChain = getChain(me)
const santaChain = getChain(santa)

console.log(meChain)
console.log(santaChain)

const matches = ( meChain.length < santaChain.length ? meChain : santaChain ).map((x, i) => {
    return meChain[i] === santaChain[i] ? 1 : 0
})

function sum (arr) {
    return arr.reduce((acc,x) => {
        return acc + x
    }, 0)
}

const orbitalTransfers = me.depth + santa.depth - 2 * sum(matches)

console.log('orbitalTransfers', orbitalTransfers)
