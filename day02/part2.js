const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')

const data = input.trim().split(',').map(x => parseInt(x.trim()))

for ( let noun = 0 ; noun <= 99 ; noun++ ) {
    for ( let verb = 0 ; verb <= 99 ; verb++ ) {
        const program = data.slice()
        program[1] = noun
        program[2] = verb
        const result = executeProgram(program)
        if ( result[0] === 19690720 ) {
            console.log(`100 * noun + verb =`, 100 * noun + verb)
        }
    }
}

function executeProgram(memory) {
    // instruction pointer
    let ip = 0
    while (true) {
        const opcode = memory[ip]
        const a = memory[ip + 1]
        const b = memory[ip + 2]
        const c = memory[ip + 3]
        switch (opcode) {
            case 1:
                memory[c] = memory[a] + memory[b]
                break;
            case 2:
                memory[c] = memory[a] * memory[b]
                break;
            case 99:
                return memory
            default:
                throw new Error(`Unknown opcode: ${memory[ip * 4]}`)
        }
        ip += 4
    }
}
