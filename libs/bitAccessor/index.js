class BitAccessor {
    constructor(uint8Array) {
        this.uint8Array = uint8Array;
    }

    validate(byteIdx, bitIdx, val) {
        if (byteIdx < 0 || byteIdx >= this.uint8Array.length ) {
            throw new Error('Array index out of range');
        }
        if (bitIdx > 7) {
            throw new Error('The bit index must be less than or equal to 7.');
        }
        if (bitIdx < 0) {
            throw new Error('The bit index must be more than or equal to 0.');
        }
        if (val !== undefined && val !== 0 && val !== 1) {
            throw new Error('Value must be 0 or 1.');
        }
    };

    get(byteIdx, bitIdx) {
        this.validate(byteIdx, bitIdx)
        return Number((this.uint8Array[byteIdx] & (1 << bitIdx)) !== 0);
    };

    set(byteIdx, bitIdx, val) {
        this.validate(byteIdx, bitIdx, val)
        val === 1 ? this.setBit(byteIdx, bitIdx) : this.resetBit(byteIdx, bitIdx);
    };

    setBit(byteIdx, bitIdx) {
        this.uint8Array[byteIdx] |= (1 << bitIdx);
    };

    resetBit(byteIdx, bitIdx) {
        this.uint8Array[byteIdx] &=~ (1 << bitIdx);
    };
};

module.exports = BitAccessor;
