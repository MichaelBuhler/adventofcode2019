const fs = require('fs')

const image = fs.readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x))

const WIDTH = 25, HEIGHT = 6

const pixelsPerLayer = WIDTH * HEIGHT
const layersInImage = image.length / pixelsPerLayer

const pixelStacks = []

for ( let pixel = 0 ; pixel < pixelsPerLayer; pixel++ ) {
    pixelStacks[pixel] = []
    for ( let layer = 0 ; layer < layersInImage ; layer++ ) {
        pixelStacks[pixel].push(image[layer*pixelsPerLayer+pixel])
    }
}

const compositedImage = pixelStacks.map(pixelStack => {
    return pixelStack.find(pixel => pixel!==2)
})

let renderedImage = ''

for ( let row = 0 ; row < HEIGHT ; row++ ) {
    for ( let column = 0 ; column < WIDTH ; column++ ) {
        renderedImage += compositedImage[row*WIDTH+column]
    }
    renderedImage += '\n'
}

console.log(renderedImage.trim())
