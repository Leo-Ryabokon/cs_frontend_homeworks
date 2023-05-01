class HashMap {
    #arraySize;
    #hashArray;
    #nonItem;
    #count;
    #factor;
    constructor(size) {
        this.#arraySize = this.#closestPrimes(size).higherPrime;
        this.#hashArray = this.#createEmptyArray(this.#arraySize);
        this.#nonItem = -1;
        this.#count = 0;
        this.#factor = 0.75;
    }

    get(key) {
        let hashVal = this.#getHash(key);
        let stepSize = this.#getStepHash(key);

        while (this.#hashArray[hashVal] !== null) {
            if(this.#isKeysEqual(this.#hashArray[hashVal][0], key)) {
                return this.#hashArray[hashVal][1];
            }

            hashVal += stepSize;
            hashVal %= this.#arraySize;
        }

        return null;
    };
    set(key, val) {
        if (this.#checkMemory()) {
            this.#memoryAdd();
        }

        let hashVal = this.#getHash(key);
        let stepSize = this.#getStepHash(key);

        while (this.#hashArray[hashVal] !== null && this.#hashArray[hashVal][0] !== -1) {
            hashVal += stepSize;
            hashVal %= this.#arraySize;
        }
        this.#hashArray[hashVal] = [key, val];
        this.#count++;
    };
    has(key) {
        return this.get(key) !== null;
    };
    delete(key) {
        let hashVal = this.#getHash(key);
        let stepSize = this.#getStepHash(key);

        while (this.#hashArray[hashVal] !== null) {
            if(this.#isKeysEqual(this.#hashArray[hashVal][0], key)) {
                const temp = this.#hashArray[hashVal];
                this.#hashArray[hashVal][0] = this.#nonItem;
                this.#count--;
                return temp[1];
            }

            hashVal += stepSize;
            hashVal %= this.#arraySize;
        }

        return null;
    };
    #getHash(key) {
        const num = this.#normalizeKey(key);
        return num % this.#arraySize;
    };

    #getStepHash(key) {
        const lowerPrime = this.#closestPrimes(this.#arraySize).lowerPrime;
        return lowerPrime - this.#normalizeKey(key) % lowerPrime;
    };
    #isKeysEqual(hashKey, key) {
        if (typeof key === 'object') {
            return this.#objToStr(hashKey) === this.#objToStr(key);
        } else {
            return hashKey === key;
        }
    };
    #normalizeKey(key) {
        if (typeof key === 'number') {
            return key % this.#arraySize;
        } else if (typeof key === 'string') {
            return this.#sumCharCode(key);
        } else {
            return this.#sumCharCode(this.#objToStr(key));
        }
    };
    #sumCharCode(str) {
        let hashVal = 0;
        const pow = str.length;

        for (let i = 0; i < pow; i++) {
            const letter = str[i].charCodeAt(0);
            hashVal = (hashVal * pow + letter) % this.#arraySize;
        }

        return hashVal;
    };
    #objToStr(obj) {
        let res = '';
        for (const [key, val] of Object.entries(obj)) {
            res = `${res}${key}${val}`;
        }

        return res;
    };
    #isPrime(value) {
        for(let i = 2; i*i <= value; i++) {
            if(value % i === 0) {
                return false;
            }
        }
        return true;
    };
    #closestPrimes(size){
        let lowerPrime, higherPrime;
        let counter = 1;

        while(!(lowerPrime && higherPrime)){

            if(!higherPrime){
                if(this.#isPrime(size + counter)){
                    higherPrime = size + counter;
                }
            }
            if(!lowerPrime){
                if(this.#isPrime(size - counter)){
                    lowerPrime = size - counter;
                }
            }
            counter++
        }
        return {lowerPrime, higherPrime};
    };
    #createEmptyArray(size) {
        const arr = new Array(size);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = null;
        }
        return arr;
    };
    #checkMemory() {
        return this.#count / this.#arraySize >= this.#factor;
    };
    #memoryAdd() {
        this.#count = 0;
        const oldArr = this.#hashArray;
        this.#arraySize = this.#closestPrimes(this.#arraySize * 2).higherPrime;
        this.#hashArray = this.#createEmptyArray(this.#arraySize);
        for (let i = 0; i < oldArr.length; i++) {
            if (oldArr[i] !== null && oldArr[i][0] !== -1) {
                this.set(oldArr[i][0], oldArr[i][1]);
            }
        }
    };
}

const map = new HashMap(5);

map.set('foo', 1);
map.set(42, 10);
map.set(document, 100);
map.set({a: 3, b: 2}, 150);

console.log(map.get(42));          // 10
console.log(map.get({a: 3, b: 2}));          // 150
console.log(map.has(document));    // true
console.log(map.delete(document)); // 10
console.log(map.has(document));    // false
