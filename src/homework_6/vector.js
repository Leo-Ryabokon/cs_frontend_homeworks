class Vector {
    #typedArray;
    #capacity;
    #arr;
    constructor(typedArray, capacity) {
        this.#typedArray = typedArray;
        this.#capacity = capacity.capacity;
        this.length = 0;
        this.#arr = new this.#typedArray(this.#capacity);
    }

    push(...val) {
        this.#assertIncreaseArray(val);

        val.forEach(item => {
            this.#arr[this.length] = item;
            this.length++;
        })
    };
    pop() {
        const res = this.#arr[this.length - 1];
        this.#arr[this.length - 1] = 0;
        this.length--;
        return res;
    };
    shift() {
        const res = this.#arr[0];
        for (let i = 0; i < this.length; i++) {
            this.#arr[i] = this.#arr[i + 1];
        }

        this.length--;
        return res;
    };
    unshift(...val) {
        this.#assertIncreaseArray(val);

        val.forEach(item => {
            for (let i = this.length; i > 0; i--) {
                this.#arr[i] = this.#arr[i - 1];
            }
            this.#arr[0] = item;
            this.length++;
        })
    };

    #assertIncreaseArray(val) {
        if (val.length + this.length > this.#arr.length) {
            this.#increaseArray();
        }
    };

    #increaseArray() {
        this.#capacity = this.#capacity * 2;
        const newArr = new this.#typedArray(this.#capacity);

        for (let i = 0; i < this.#arr.length; i++) {
            newArr[i] = this.#arr[i];
        }

        this.#arr = newArr;
    };
}

const uint8Vector = new Vector(Uint32Array, {capacity: 3});

uint8Vector.push(100);             // 1      100
uint8Vector.push(20, 10);          // 3      100, 20, 10
uint8Vector.push(40);              // 4      100, 20, 10, 40

uint8Vector.pop();                // 40      100, 20, 10

uint8Vector.shift();              // 100     20, 10

uint8Vector.unshift(1);      // 2        1, 20, 10
uint8Vector.unshift(2);      // 2        2, 1, 20, 10

console.log(uint8Vector.length); // 4
