class Stack {
    constructor(Int32Array, length) {
        this.maxLength = length;
        this.int32Array = new Int32Array(this.maxLength);
        this.counter = -1;
        this.head = null;
    }

    push(val) {
        if (this.counter >= this.maxLength - 1) {
            throw new Error('This Stack overflow.');
        }
        this.counter++;
        this.int32Array[this.counter] = val;
        this.head = val;
    };

    pop() {
        if (this.counter >= 0) {
            const val = this.int32Array[this.counter];
            this.counter--;
            this.head = this.int32Array[this.counter];
            return val;
        } else {
            throw new Error('This Stack is empty.');
        }
    };
}

const stack = new Stack(Int32Array, 3);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head);  // 12
console.log(stack.pop()); // 12
console.log(stack.head);  // 11
console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.pop()); // Exception
