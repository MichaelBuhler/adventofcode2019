const fs = require('fs')

const IntcodeVirtualMachine = require('./IntcodeVirtualMachine')

const AmplifierControllerSoftware = fs.readFileSync('./input.txt', 'utf-8').trim().split(',').map(x => parseInt(x.trim()))

const AmpA = new IntcodeVirtualMachine(AmplifierControllerSoftware)
const AmpB = new IntcodeVirtualMachine(AmplifierControllerSoftware)
const AmpC = new IntcodeVirtualMachine(AmplifierControllerSoftware)
const AmpD = new IntcodeVirtualMachine(AmplifierControllerSoftware)
const AmpE = new IntcodeVirtualMachine(AmplifierControllerSoftware)

function runPermutation (phaseSettings, input) {
    const outputA = []
    AmpA.execute(IntcodeVirtualMachine.stdin([phaseSettings[0]].concat(input)), IntcodeVirtualMachine.stdout(outputA))
    const outputB = []
    AmpB.execute(IntcodeVirtualMachine.stdin([phaseSettings[1]].concat([outputA[0]])), IntcodeVirtualMachine.stdout(outputB))
    const outputC = []
    AmpC.execute(IntcodeVirtualMachine.stdin([phaseSettings[2]].concat([outputB[0]])), IntcodeVirtualMachine.stdout(outputC))
    const outputD = []
    AmpD.execute(IntcodeVirtualMachine.stdin([phaseSettings[3]].concat([outputC[0]])), IntcodeVirtualMachine.stdout(outputD))
    const outputE = []
    AmpE.execute(IntcodeVirtualMachine.stdin([phaseSettings[4]].concat([outputD[0]])), IntcodeVirtualMachine.stdout(outputE))
    return outputE
}

// https://en.wikipedia.org/wiki/Heap%27s_algorithm
function swap(a,b,c) {
    const tmp = a[b]
    a[b] = a[c]
    a[c] = tmp
}
function permutate (options) {
    const permutations = []
    function generate (k, a) {
        if ( k === 1 ) {
           permutations.push(a.slice())
        } else {
            generate(k-1, a)
            for ( let i = 0 ; i < k-1 ; i++ ) {
                if ( k % 2 === 0 ) {
                    swap(a, i, k-1)
                } else {
                    swap(a, 0, k-1)
                }
                generate(k-1, a)
            }
        }
    }
    generate(options.length, options)
    return permutations
}

const permutations = permutate([0,1,2,3,4])

const signals = permutations.map(permutation => runPermutation(permutation, [0]))

const maxSignal = Math.max.apply(null, signals)

console.log('maxSignal', maxSignal)
