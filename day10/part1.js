const fs = require('fs')

const map = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n').map(x => x.trim().split(''))

const DEBUG = false

const SPACE = '.'
const ASTEROID = '#'

const HEIGHT = map.length
const WIDTH = map[0].length

const coords = []
for ( let y = 0 ; y < HEIGHT ; y++ ) {
    for ( let x = 0 ; x < WIDTH ; x++ ) {
        coords.push([x, y])
    }
}

const data = coords.map(([x, y]) => {
    const datum = {
        location: { x, y },
        asteroidsInSight: 0
    }
    if ( map[y][x] === SPACE ) {
        datum.asteroidsInSight = -1
        return datum
    }
    if (DEBUG) console.log(`checking for asteroids visible from [${x},${y}]...`)
    const asteroids = []
    for ( let y = 0 ; y < HEIGHT ; y++ ) {
        const row = []
        for ( let x = 0 ; x < WIDTH ; x++ ) {
            row.push(1)
        }
        asteroids.push(row)
    }
    coords.forEach(([xx, yy]) => {
        if ( x === xx && y === yy ) {
            if (DEBUG) console.log(`  [${xx},${yy}] is this asteroid...`)
            asteroids[yy][xx] = 0
            return
        }
        const rise = yy - y
        const run = xx - x
        let hidden = false
        for ( let xxx = x + run, yyy = y + rise ; 0 <= xxx && xxx < WIDTH && 0 <= yyy && yyy < HEIGHT ; xxx += run, yyy += rise ) {
            if ( map[yyy][xxx] === ASTEROID ) {
                if (DEBUG) console.log(`  [${xxx},${yyy}] is an asteroid...`)
                if (hidden) {
                    if (DEBUG) console.log(`    but it is not visible...`)
                    asteroids[yyy][xxx] = 0
                }
                hidden = true
            } else {
                asteroids[yyy][xxx] = 0
            }
        }
    })
    if (DEBUG) console.log(`visible from [${x},${y}]:`)
    if (DEBUG) console.log(asteroids)
    datum.asteroidsInSight = asteroids.map(row => row.reduce((acc, x) => acc + x, 0)).reduce((acc, x) => acc + x, 0)
    return datum
})

const bestLocation = data.reduce((acc, x) => {
    return x.asteroidsInSight > acc.asteroidsInSight ? x : acc
}, {asteroidsInSight:-1})

console.log(bestLocation)