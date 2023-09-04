import { intoIter } from './iter';

interface ParserToken<T = unknown> {
    type: string;
    value?: T;
}

interface ParserValue<T = unknown> extends ParserToken<T> {

}

type ParserResult<T = unknown> = [ParserValue, Iterable<string>];

type Parser<T = unknown, R = unknown> =
    (iterable: Iterable<string>, prev?: ParserValue) =>
        Generator<ParserToken<T>, ParserResult<R>, Iterable<string> | undefined>;

function tag(iterable: Iterable<string>): Parser<string, string> {
    return function* (source) {
        let
            iter = intoIter(source),
            value = '';

        for (const test of iterable) {
            let
                chunk = iter.next(),
                char = chunk.value;

            value += char;
        }

        const token = { type: 'TAG', value: value };

        return [token, iter];
    }
}

const fnTag = tag('function')('function foo() {}');

console.log(fnTag.next()); // {done: true, value: {type: 'TAG', value: 'function'}}
