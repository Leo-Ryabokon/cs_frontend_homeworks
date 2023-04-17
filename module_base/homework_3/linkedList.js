class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
    }

    add(data) {
        const node = new Node(data);
        if (this.last === null) {
            this.first = node;
        } else {
            this.last.next = node;
            node.prev = this.last;
        }
        this.last = node;
    };

    removeLast() {
        if (this.last !== null) {
            this.last = this.last.prev;
            if (this.last !== null) {
                this.last.next = null;
            } else {
                this.first = null;
            }
        }
    };

    *[Symbol.iterator]() {
        let current = this.first;

        while (current) {
            yield current.value;
            current = current.next;
        }
    };
}

const list = new LinkedList();

list.add(1);
list.add(2);
list.add(3);

console.log(list.first.value);           // 1
console.log(list.last.value);            // 3
console.log(list.first.next.value);      // 2
console.log(list.first.next.prev.value); // 1

list.removeLast();

console.log(list.last.value);            // 2

console.log('logs from iter');
for (const value of list) {
    console.log(value);
}
