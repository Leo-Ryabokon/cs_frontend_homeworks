"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iter_1 = require("./iter");
function tag(iterable) {
    return function* (source) {
        let iter = (0, iter_1.intoIter)(source), value = '';
        for (const test of iterable) {
            let chunk = iter.next(), char = chunk.value;
            value += char;
        }
        const token = { type: 'TAG', value: value };
        return [token, iter];
    };
}
const fnTag = tag('function')('function foo() {}');
console.log(fnTag.next()); // {done: true, value: {type: 'TAG', value: 'function'}}
