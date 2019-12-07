const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const [ directions1, directions2 ] = input.trim().split('\n').map(x => x.trim().split(','))

function toPath(directions) {
    const path = []
    let x = 0
    let y = 0
    let steps = 0
    directions.forEach(direction => {
        const d = direction.substr(0,1)
        const distance = parseInt(direction.substr(1))
        switch (d) {
            case 'U':
                for ( let i = 0 ; i < distance ; i++ ) {
                    x++
                    steps++
                    path.push([x,y,steps])
                }
                break
            case 'D':
                for ( let i = 0 ; i < distance ; i++ ) {
                    x--
                    steps++
                    path.push([x,y,steps])
                }
                break
            case 'L':
                for ( let i = 0 ; i < distance ; i++ ) {
                    y--
                    steps++
                    path.push([x,y,steps])
                }
                break
            case 'R':
                for ( let i = 0 ; i < distance ; i++ ) {
                    y++
                    steps++
                    path.push([x,y,steps])
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

const intersections = []

function log (index) {
    console.log(`\nPoint ${index}/${path1.length} (${index/path1.length*100}%)`)
    console.log('intersections', intersections.length)
    const stepSums = intersections.map(intersection => intersection[2] + intersection[3])
    console.log('stepSums', stepSums.length)
    const minimumStepSum = Math.min.apply(null, stepSums)
    console.log('minimumStepSum', minimumStepSum)
}

path1.forEach((point1, index) => {
    const point2 = path2.find(point2 => {
        return point1[0] === point2[0] && point1[1] === point2[1]
    })
    if (
        point2
    ) {
        intersections.push([
            point1[0],
            point1[1],
            point1[2],
            point2[2]
        ])
        log(index)
    }
    if ( index % 1000 === 0 ) log(index)
})

log(path1.length)
