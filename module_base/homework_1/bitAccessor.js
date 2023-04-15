const BitAccessor = require('../../libs/bitAccessor');

const bit = new BitAccessor(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bit.get(0, 1)); // 1
console.log(bit.get(1, 1)); // 0

bit.set(0, 1, 0);
console.log(bit.get(0, 1)); // 0
