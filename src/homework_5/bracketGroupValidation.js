const Stack = require('../libs/Stack');
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

// console.log(isValid('((')); // false

const removeDuplicates = function(nums) {
    const set = new Set();
    const counts = [];

    for (let i = 0; i < nums.length; i++) {
        if (!set.has(nums[i])) {
            set.add(nums[i]);
            counts.push(nums[i]);
        }
    }

    return counts;
};

console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]));
