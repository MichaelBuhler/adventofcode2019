const fs = require('fs')

const image = fs.readFileSync('./input.txt', 'utf-8').split('').map(x => parseInt(x))

const WIDTH = 25, HEIGHT = 6

const pixelsPerLayer = WIDTH * HEIGHT
const layersInImage = image.length / pixelsPerLayer

const layers = []

for ( let layer = 0 ; layer < layersInImage; layer++ ) {
    layers.push(image.slice(layer*pixelsPerLayer,(layer+1)*pixelsPerLayer))
}

const zerosPerLayer = layers.map(layer => layer.filter(pixel => pixel===0).length)

const minZerosPerLayer = Math.min.apply(null, zerosPerLayer)

const indexOfLayerWithMostZeros = zerosPerLayer.findIndex(zeros => zeros===minZerosPerLayer)

const layerWithMostZeros = layers[indexOfLayerWithMostZeros]

const ones = layerWithMostZeros.filter(pixel => pixel===1).length
const twos = layerWithMostZeros.filter(pixel => pixel===2).length

console.log(ones*twos)
