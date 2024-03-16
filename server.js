const os = require('os')
const math = require('./math')

console.log(math.add(2, 3))
console.log(math.subtract(2, 3))
console.log(math.multiply(2, 3))
console.log(math.divide(2, 3))

console.log('Hello world')

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)