class Stack {
    constructor(Array, length) {
        this.maxLength = length;
        this.array = new Array(this.maxLength);
        this.counter = -1;
        this.head = null;
    }

    push(val) {
        if (this.counter >= this.maxLength - 1) {
            throw new Error('This Stack overflow.');
        }
        this.counter++;
        this.array[this.counter] = val;
        this.head = val;
    };

    pop() {
        if (!this.isEmpty()) {
            const val = this.array[this.counter];
            this.counter--;
            this.head = this.array[this.counter] || null;
            return val;
        } else {
            throw new Error('This Stack is empty.');
        }
    };

    isEmpty() {
        return this.counter === -1;
    };
}

module.exports = Stack;
