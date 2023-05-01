const Stack = require('../../libs/Stack');
const isValid = str => {
    const onlyBrackets = str.match(/\{+|\}+|\[+|\]+|\(+|\)+/g).join('');
    if (onlyBrackets.length % 2 !== 0) {
        return false;
    }

    const stack = new Stack(Array, onlyBrackets.length);
    let isValid = true;

    for (let ch of onlyBrackets) {
        switch (ch) {
            case '{':
            case '[':
            case '(':
                stack.push(ch);
                break;

            case '}':
            case ']':
            case ')':
                if (!stack.isEmpty()) {
                    const char = stack.pop();
                    if ((ch === '}' && char !== '{') || (ch === ']' && char !== '[') || (ch === ')' && char !== '(')) {
                        isValid = false;
                    }
                } else {
                    isValid = false;
                }
                break;
            default:
                break;
        }
    }
    return isValid;
}

console.log(isValid('(hello{world} and [me])'));     // true
console.log(isValid('(hello{world)} and [me])'));    // false
console.log(isValid(')'));                           // false;
console.log(isValid('{hello (world) [and (me)]}')); // true
