"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intoIterableIter = exports.intoIter = void 0;
function intoIter(iterable) {
    return intoIterableIter(iterable[Symbol.iterator]());
}
exports.intoIter = intoIter;
function intoIterableIter(iter) {
    if (typeof iter[Symbol.iterator] === 'function') {
        return iter;
    }
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            return iter.next();
        }
    };
}
exports.intoIterableIter = intoIterableIter;
