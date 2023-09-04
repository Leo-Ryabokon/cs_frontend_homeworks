const BitAccessor = require('../../libs/bitAccessor');

const schema = [
    [3, 'number'],  // 3 бита число
    [3, 'number'],  // 3 бита число
    [1, 'boolean'], // 1 бит логический
    [1, 'boolean'], // 1 бит логический
    [16, 'ascii'],  // 16 бит 2 аски символа
];

class Coder {
    constructor(data) {
        this.data = data;
    }

    encode(array, schema) {
        this._validate(array, schema, 'encode');
        const bitsLength = schema.reduce((acc, el) => (acc += el[0]), 0);
        const bytesLength = Math.ceil(bitsLength/8);
        const uint8Array = new Uint8Array(bytesLength);
        const bitAccessor = new BitAccessor(uint8Array);
        let encodeData = [];
        schema.forEach((item, idx) => {
            encodeData = [...encodeData, ...this._getBinaryByType(array[idx], item[0],item[1])].join('');
        });

        encodeData.match(/.{1,8}/g).forEach((byte, idx) => {
            for (let i = 0; i < byte.length; i++) {
                bitAccessor.set(idx, i, Number(byte[i]));
            }
        });
        return uint8Array.buffer;
    }

    decode(data, schema) {
        this._validate(data, schema, 'decode');
        const uint8arr = new Uint8Array(data);
        const bitAccessor = new BitAccessor(uint8arr);
        let dataArray = [];
        let chunksArr = [];
        uint8arr.forEach((item, idx) => {
            const byte = this._numToBin(item).padStart(8, '0');
            for (let i = 0; i < byte.length; i++) {
                chunksArr.push(bitAccessor.get(idx, i));
            }
        })

        schema.forEach(item => {
            dataArray.push(this._getDataByType(chunksArr.splice(0, item[0]).join(''), item[1]));
        });

        return dataArray;
    };

    _validate = (data, schema, type = 'encode') => {
        if (type === 'encode') {
            if (!data || !schema || data.length !== schema.length) {
                throw new Error(`Arrgs are not valid`);
            }

            for (let i = 0; i < schema.length; i++) {
                if (typeof data[i] === 'string') {
                    if (!this._isASCII(data[i])) {
                        throw new Error(`Data ${data[i]} should be ascii symbol`);
                    }
                } else {
                    if (typeof data[i] !== 'string' && typeof data[i] !== schema[i][1]) {
                        throw new Error(`Data ${data[i]} does not match the validation scheme`);
                    }
                }
            }
        } else if (type === 'decode') {
            if (!data || !schema || !schema.length) {
                throw new Error(`Arrgs are not valid`);
            }
            if (!data.buffer instanceof ArrayBuffer || data.byteLength === undefined) {
                throw new Error(`ArrayBuffer data is not valid`);
            }
        }
    }

    _getBinaryByType = (value, valueLength, type) => {
        switch(type) {
            case 'number':
                return this._numToBin(value, valueLength);
            case 'boolean':
                return value ? '1' : '0';
            case 'ascii':
                return this._asciiToBin(value, valueLength);
        }
    }

    _getDataByType = (value, type) => {
        switch(type) {
            case 'number':
                return this._binToNum(value);
            case 'boolean':
                return value === '1';
            case 'ascii':
                return this._binToAscii(value);
            default:
                return value;
        }
    }

    _numToBin(num, length) {
        return num.toString(2).padStart(length, '0');
    };

    _binToNum(binary) {
        return parseInt(binary, 2);
    };

    _asciiToBin(string) {
        return string.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    };

    _binToAscii(binary) {
        const arrBinStr = binary.match(/.{1,8}/g);
        let str = '';
        arrBinStr.forEach(item => {
            str += String.fromCharCode(parseInt(item, 2));
        });
        return str;
    };
    _isASCII(str) {
        return /^[\x00-\x7F]*$/.test(str);
    }
};
const coder = new Coder();
const data = coder.encode([2, 3, true, false, 'aф'], schema);
console.log(data);

const array = coder.decode(data, schema);
console.log(array);
