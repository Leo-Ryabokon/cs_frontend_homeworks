function random(min, max) {
    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            return {
                value: Math.floor(Math.random() * (max - min + 1) + min),
                done: false,
            }
        }
    }
}

const randomInt = random(0, 100);
console.log(randomInt.next());

function skip(i, count) {
    const innerIter = i[Symbol.iterator]();

    let skipped = false;

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            if (skipped) {
                return innerIter.next();
            }

            skipped = true;

            for (let i = 0; i < count; i++) {
                const { done, value } = innerIter.next();

                if (done) {
                    return { done, value };
                }
            }
            return innerIter.next();
        },
    }
}
function take(i, limit) {
    const innerIter = i[Symbol.iterator]();
    let total = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            if (total >= limit) {
                return {
                    done: true,
                    value: undefined,
                }
            }

            total++;
            return innerIter.next();
        },
    }
}
const randomInt1 = random(0, 100);
console.log([...take(randomInt1, 15)]);

function filter(i, pred) {
    const innerIter = i[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let chunk = innerIter.next();

            while (true) {
                if (chunk.done || pred(chunk.value)) {
                    return chunk;
                }

                chunk = innerIter.next();
            }
        }
    }
}
const randomInt2 = random(0, 100);
console.log([...take(filter(randomInt2, (el) => el > 30), 15)]);

function enumerate(i) {
    const cursor = i[Symbol.iterator]();
    let j = 0;

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            const chunk = cursor.next();

            if (chunk.done) {
                return { done, value: undefined };
            }

            return {
                done: false,
                value: [j++, chunk.value],
            }
        }
    }
}
const randomInt3 = random(0, 100);
console.log([...take(enumerate(randomInt3), 3)]); // [[0, ...], [1, ...], [2, ...]]

class Range {
    #type;
    #reversed;
    constructor(from, to) {
        this.#type = typeof from === 'string' ? 'string' : 'number';
        this.from = this.#getNumber(from);
        this.to = this.#getNumber(to);
        this.#reversed = this.from > this.to;
    }

    [Symbol.iterator]() {
        return this.values();
    }

    values() {
        let start = this.from;
        const end = this.to;
        return {
            [Symbol.iterator]() {
                return this;
            },

            next: () => {
                if (this.#reversed ? start < end : start > end) {
                    return {
                        done: true,
                        value: undefined,
                    }
                }
                return {
                    done: false,
                    value: this.#getT(this.#reversed ? start-- : start++),
                }

            },
        }
    }

    reverse() {
        return new Range(this.#getT(this.to), this.#getT(this.from)).values();
    }

    #getNumber(val) {
        if (this.#type === 'string') {
            return val.codePointAt(0);
        }

        return val;
    }

    #getT(val) {
        if (this.#type === 'string') {
            return String.fromCodePoint(val);
        }

        return val;
    }
}
const symbolRange = new Range('a', 'f');
console.log(Array.from(symbolRange)); // ['a', 'b', 'c', 'd', 'e', 'f']
const numberRange = new Range(-5, 1);
console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]

function seq(...args) {
    const iter = args.map((i) => i[Symbol.iterator]()).values();

    let cursor = iter.next()
    let innerIter = null;

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            while (true) {
                if (cursor.done) {
                    return { done: true, value: undefined }
                }

                if (innerIter == null) {
                    innerIter = cursor.value;
                }
                const chunk = innerIter.next();

                if (!chunk.done) {
                    return chunk;
                }

                cursor = iter.next();
                innerIter = null;
            }
        },
    }
}
console.log(...seq([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'

function zip(...args) {
    const iters = args.map((i) => i[Symbol.iterator]());

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            const res = new Array(iters.length);

            for (const [i, iter] of iters.entries()) {
                const chunk = iter.next();

                if (chunk.done) {
                    return { done: true, value: undefined }
                }

                res[i] = chunk.value;
            }

            return {
                done: false,
                value: res,
            }
        }
    }
}
console.log(...zip([1, 2], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]

function mapSeq(iter, mappers) {
    const currentIter = iter[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let { done, value } = currentIter.next();

            if (done) {
                return { done, value };
            }

            const transformedValue = Array.from(mappers).reduce((acc, mapper) => mapper(acc), value);

            return { done: false, value: transformedValue };
        },
    }
}
console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]
