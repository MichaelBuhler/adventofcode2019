module.exports = class IntcodeVirtualMachine {
    constructor (program) {
        this.memory = program
    }
    static stdin (args) {
        return function stdinShifter () {
            return args.shift()
        }
    }
    static stdout (array) {
        return function stdoutPusher (value) {
            array.push(value)
        }
    }
    execute (stdin, stdout) {
        const memory = this.memory
        let ip = 0
        while (true) {
            const instruction = leftPadInstruction(memory[ip])
            const opcode = instruction.substr(-2)
            const flag_a = instruction.charAt(2) === '1'
            const flag_b = instruction.charAt(1) === '1'
            const flag_c = instruction.charAt(0) === '1'
            const param_a = memory[ip+1]
            const param_b = memory[ip+2]
            const param_c = memory[ip+3]
            let a, b, c
            switch (opcode) {
                case '01':
                    a = flag_a ? param_a : memory[param_a]
                    b = flag_b ? param_b : memory[param_b]
                    c = param_c
                    memory[c] = a + b
                    ip += 4
                    break;
                case '02':
                    a = flag_a ? param_a : memory[param_a]
                    b = flag_b ? param_b : memory[param_b]
                    c = param_c
                    memory[c] = a * b
                    ip += 4
                    break;
                case '03':
                    a = param_a
                    b = null
                    c = null
                    const nextValue = stdin()
                    if ( nextValue === undefined ) {
                        throw new Error('Unexpected end of input!')
                    }
                    memory[a] = nextValue
                    ip += 2
                    break;
                case '04':
                    a = param_a
                    b = null
                    c = null
                    stdout(memory[a])
                    ip += 2
                    break
                case '05':
                    a = flag_a ? param_a : memory[param_a]
                    b = flag_b ? param_b : memory[param_b]
                    c = null
                    if ( a !== 0 ) {
                        ip = b
                    } else {
                        ip += 3
                    }
                    break
                case '06':
                    a = flag_a ? param_a : memory[param_a]
                    b = flag_b ? param_b : memory[param_b]
                    c = null
                    if ( a === 0 ) {
                        ip = b
                    } else {
                        ip += 3
                    }
                    break
                case '07':
                    a = flag_a ? param_a : memory[param_a]
                    b = flag_b ? param_b : memory[param_b]
                    c = param_c
                    memory[c] = a < b ? 1 : 0
                    ip += 4
                    break
                case '08':
                    a = flag_a ? param_a : memory[param_a]
                    b = flag_b ? param_b : memory[param_b]
                    c = param_c
                    memory[c] = a === b ? 1 : 0
                    ip += 4
                    break
                case '99':
                    return memory
                default:
                    throw new Error(`Unknown opcode: ${memory[ip * 4]}`)
            }
        }
    }
}

function leftPadInstruction (integerInstruction) {
    let instruction = '' + integerInstruction
    while ( instruction.length < 5 ) {
        instruction = '0' + instruction
    }
    return instruction
}