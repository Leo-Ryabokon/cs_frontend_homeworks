const LinkedList = require('../libs/LinkedList');

const list = new LinkedList();

list.addLast(1);
list.addLast(2);
list.addLast(3);

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
