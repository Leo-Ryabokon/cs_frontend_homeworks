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

    addFirst(data) {
        const node = new Node(data);
        if (this.first === null) {
            this.last = node;
        } else {
            this.first.prev = node;
            node.next = this.first;
        }
        this.first = node;
    }

    addLast(data) {
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

    removeFirst() {
        if (this.first !== null) {
            this.first = this.first.next;
            if (this.first !== null) {
                this.first.prev = null;
            } else {
                this.last = null;
            }
        }
    };

    getFirst() {
        return this.first;
    };

    getLast() {
        return this.last;
    };

    *[Symbol.iterator]() {
        let current = this.first;

        while (current) {
            yield current.value;
            current = current.next;
        }
    };
}

module.exports = LinkedList;
