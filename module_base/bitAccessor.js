class BitAccessor {
    constructor(uint8Array) {
        this.uint8Array = uint8Array;
    }

    isValid(byteIdx, bitIdx, val) {
        let isValid = true;
        if (byteIdx < 0 || byteIdx >= this.uint8Array.length ) {
            console.log('Array index out of range');
            isValid = false;
        }
        if (bitIdx > 7) {
            console.log('The bit index must be less than or equal to 7.');
            isValid = false;
        }
        if (bitIdx < 0) {
            console.log('The bit index must be more than or equal to 0.');
            isValid = false;
        }
        if (val !== undefined && val !== 0 && val !== 1) {
            console.log('Value must be 0 or 1.');
            isValid = false;
        }

        return isValid;
    };

    get(byteIdx, bitIdx) {
        if (this.isValid(byteIdx, bitIdx)) {
            return Number((this.uint8Array[byteIdx] & (1 << bitIdx)) !== 0);
        }
    };

    set(byteIdx, bitIdx, val) {
        if (this.isValid(byteIdx, bitIdx, val)) {
            val === 1
                ? this.setBit(byteIdx, bitIdx)
                : this.resetBit(byteIdx, bitIdx);
        }
    };

    setBit(byteIdx, bitIdx) {
        this.uint8Array[byteIdx] |= (1 << bitIdx);
    };

    resetBit(byteIdx, bitIdx) {
        this.uint8Array[byteIdx] &=~ (1 << bitIdx);
    };
};

const bit = new BitAccessor(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bit.get(0, 1)); // 1
console.log(bit.get(1, 1)); // 0

bit.set(0, 1, 0);
console.log(bit.get(0, 1)); // 0
