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

function buildMap (bodyName, depth) {
    return {
        name: bodyName,
        depth,
        satellites: bodies[bodyName] && bodies[bodyName].map(satelliteName => buildMap(satelliteName, depth+1))
    }
}

const map = buildMap('COM', 0)

function sum (arr) {
    return arr.reduce((acc,x) => {
        return acc + x
    }, 0)
}

function sumSatelliteDepths (body) {
    if (body.satellites) {
        return body.depth + sum(body.satellites.map(satellite => sumSatelliteDepths(satellite)))
    } else {
        return body.depth
    }
}

console.log('sumSatelliteDepths', sumSatelliteDepths(map))
