console.log(/^[\w$]*$/.test('привет')); // false

console.log('762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;'.split(/,\d+,\d+;/)); // ['762120', '763827', '750842', '749909', '755884']
console.log('762120,0,22;763827,0,50;750842,0,36;749909,0,95;755884,0,41;'.split({
    [Symbol.split](str) {
        return str.split(/,\d+,\d+;/).slice(0, -1);
    }
})); // ['762120', '763827', '750842', '749909', '755884']

// [['"a": 1', 'a', '1'], ['"b": "2"', 'b', '"2"']]
console.log([...'{"a": 1, "b": "2"}'.matchAll(/"([^"]*)"[ ]*:[ ]*(\d|null|true|false|"[^"]*")/g)]);

// Hello, Bob! Your age is 10.
const res = format('Hello, ${user}! Your age is ${age}.', {user: 'Bob', age: 10});

function format(str, variables) {
    return str.replace(/\${(.*?)}/g, (_, varName) => variables[varName]);
}

console.log(res);

function calc(str) {
    return str.replace(/[-+]?\(*[-+]?\d[-+*/\d() ]*/g, (str) => Function(`return ${str}`)());
}

console.log(calc(`
Какой-то текст (10 + 15 - 24) ** 2
Еще какой то текст 2 * 10
`));
