const LinkedList = require('../libs/LinkedList');

class Queue {
    constructor(LinkedList) {
        this.linkedList = new LinkedList;
        this.head = null;
    }
    push(val) {
        this.linkedList.addLast(val);
        this._setHead();
    };

    pop() {
        if (this.linkedList.first || this.linkedList.last) {
            const val = this.head;
            this.linkedList.removeLast();
            this._setHead();
            return val;
        } else {
            throw new Error('This Queue is empty.');
        }
    };

    unshift(val) {
        this.linkedList.addFirst(val);
        this._setHead();
    };

    shift() {
        if (this.linkedList.first || this.linkedList.last) {
            const val = this.linkedList.getFirst().value;
            this.linkedList.removeFirst();
            return val;
        } else {
            throw new Error('This Queue is empty.');
        }
    };

    _setHead() {
        this.head = this.linkedList.getLast()?.value || null;
    };
}

const dequeue = new Queue(LinkedList);

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop());   // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop());   // 10
console.log(dequeue.pop());   // Exception
