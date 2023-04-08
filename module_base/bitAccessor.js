class BitAccessor {
    constructor(uint8Array) {
        this.uint8Array = uint8Array;
    }

    isValidate(baitIdx, bitIdx) {
        let isValidate = true;
        if (baitIdx < 0 || baitIdx >= this.uint8Array.length ) {
            console.log('Array index out of range');
            isValidate = false;
        }
        if (bitIdx > 7) {
            console.log('The bit index must be less than or equal to 7');
            isValidate = false;
        }
        if (bitIdx < 0) {
            console.log('The bit index must be more than or equal to 0');
            isValidate = false;
        }

        return isValidate;
    };

    get(baitIdx, bitIdx) {
        if (this.isValidate(baitIdx, bitIdx)) {
            return Number((this.uint8Array[baitIdx] & (1 << bitIdx)) !== 0);
        }
    };

    set(baitIdx, bitIdx, val) {
        if (this.isValidate(baitIdx, bitIdx)) {
            Number(Boolean(val)) === 1
                ? this.setBit(baitIdx, bitIdx)
                : this.resetBit(baitIdx, bitIdx);
        }
    };

    setBit(baitIdx, bitIdx) {
        this.uint8Array[baitIdx] |= (1 << bitIdx);
    };

    resetBit(baitIdx, bitIdx) {
        this.uint8Array[baitIdx] &=~ (1 << bitIdx);
    };
};

const bit = new BitAccessor(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bit.get(0, 1)); // 1
console.log(bit.get(1, 1)); // 0

bit.set(0, 1, 0);
console.log(bit.get(0, 1)); // 0
