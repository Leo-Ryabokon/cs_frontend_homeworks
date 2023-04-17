const SCHEMA_TYPES = {
    UTF16: 'utf16',
    U16: 'u16',
};

class Structure  {
    constructor(schema) {
        this.schema = schema;
        const bytesLength = this._getArrayLength(this.schema);
        this.uint16Array = new Uint16Array(bytesLength);
    }

    _getArrayLength(schema) {
        return schema.reduce((acc, el) => (el[2] ? acc += el[2] : acc += 1), 0);
    };

    _getSchemaDataByKey(key, schema) {
        let offset = 0;
        let format = null;
        let length = 0;
        for (let i = 0; i < schema.length; i++) {
            let item = schema[i];
            length = item[2] || 1;

            if (key === item[0]) {
                format = item[1];
                break;
            }

            offset += length;
        }
        return [offset, format, length];
    }

    _setString(str, offset, length) {
        for (let i = 0; i < length; i++) {
            if (str[i]) {
                this.uint16Array[i + offset] = str[i].charCodeAt(0);
            } else {
                this.uint16Array[i + offset] = 0;
            }
        }
    };

    _setNumber(num, offset) {
        this.uint16Array[offset] = num;
    };
    get(key) {
        const [ offset, format, length ] = this._getSchemaDataByKey(key, this.schema);

        if (format === SCHEMA_TYPES.UTF16) {
            let str = '';

            for (let i = 0; i < length; i++) {
                str += String.fromCharCode(this.uint16Array[i + offset]);
            }

            return str;
        } else if (format === SCHEMA_TYPES.U16) {
            return this.uint16Array[offset];
        } else {
            throw new Error('Structure does not contain this key');
        }
    };

    set(key, val) {
        const [ offset, format, length ] = this._getSchemaDataByKey(key, this.schema);

        if (format === SCHEMA_TYPES.UTF16 && typeof val === 'string') {
            this._setString(val, offset, length);
        } else if (format === SCHEMA_TYPES.U16 && typeof val === 'number') {
            this._setNumber(val, offset);
        } else {
            throw new Error('Not valid input data.');
        }
    };
};

const jackBlack = new Structure([
    ['name', 'utf16', 10], // Число - это максимальное количество символов
    ['lastName', 'utf16', 10],
    ['age', 'u16'], // uint16
    ['role', 'utf16', 10],
]);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);
jackBlack.set('role', 'Employee');
jackBlack.set('role', 'Manager');

console.log(jackBlack.get('name')); // 'Jack'
console.log(jackBlack.get('lastName')); // 'Black'
console.log(jackBlack.get('age')); // 53
console.log(jackBlack.get('role')); // 'Manager
