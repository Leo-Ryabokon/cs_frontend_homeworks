export function intoIter<T>(iterable: Iterable<T>): IterableIterator<T> {
    return intoIterableIter(iterable[Symbol.iterator]());
}

export function intoIterableIter<T>(iter: Iterator<T>): IterableIterator<T> {
    if (typeof iter[Symbol.iterator] === 'function') {
        return <any>iter;
    }

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            return iter.next();
        }
    }
}
