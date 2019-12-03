const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const memory = input.trim().split(',').map(x => parseInt(x.trim()))

// restore "1202 program alarm" state
memory[1] = 12
memory[2] = 2

// program counter
let pc = 0

loop: {
    while (true) {
        const opcode = memory[pc]
        const a = memory[pc+1]
        const b = memory[pc+2]
        const c = memory[pc+3]
        switch (opcode) {
            case 1:
                memory[c] = memory[a] + memory[b]
                break;
            case 2:
                memory[c] = memory[a] * memory[b]
                break;
            case 99:
                break loop
            default:
                throw new Error(`Unknown opcode: ${memory[pc * 4]}`)
        }
        pc += 4
    }
}

console.log(`memory[0]: ${memory[0]}`)
