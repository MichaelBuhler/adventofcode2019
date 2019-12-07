const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const [ directions1, directions2 ] = input.trim().split('\n').map(x => x.trim().split(','))

function toPath(directions) {
    const path = []
    let x = 0
    let y = 0
    directions.forEach(direction => {
        const d = direction.substr(0,1)
        const distance = parseInt(direction.substr(1))
        switch (d) {
            case 'U':
                for ( let i = 0 ; i < distance ; i++ ) {
                    x++
                    path.push([x,y])
                }
                break
            case 'D':
                for ( let i = 0 ; i < distance ; i++ ) {
                    x--
                    path.push([x,y])
                }
                break
            case 'L':
                for ( let i = 0 ; i < distance ; i++ ) {
                    y--
                    path.push([x,y])
                }
                break
            case 'R':
                for ( let i = 0 ; i < distance ; i++ ) {
                    y++
                    path.push([x,y])
                }
                break
            default:
                throw new Error(`Unknown direction ${d}`)
        }
    })
    return path
}

const path1 = toPath(directions1)
const path2 = toPath(directions2)

// console.log('path1', path1)
// console.log('path2', path2)

const intersections = []

function log (index) {
    console.log(`Point ${index}/${path1.length} (${index/path1.length*100}%)`)
    console.log('intersections', intersections)
    const manhattanDistances = intersections.map(point => Math.abs(point[0]) + Math.abs(point[1]))
    console.log('manhattanDistances', manhattanDistances)
    const minimumManhattanDistance = Math.min.apply(null, manhattanDistances)
    console.log('minimumManhattanDistance', minimumManhattanDistance)
}

path1.forEach((point1, index) => {
    if (
        path2.find(point2 => {
            return point1[0] === point2[0] && point1[1] === point2[1]
        })
    ) {
        intersections.push(point1)
        log(index)
    }
    if ( index % 1000 === 0 ) log(index)
})

log(path1.length)
