const recursionCollapse = (obj, str = '', res = {}) => {
    if (typeof obj !== 'object') {
        res[str ? str.slice(0, -1) : ''] = obj;
        return res;
    }

    Object.keys(obj).forEach(key => {
        res = recursionCollapse(obj[key], `${str}${key}.`, res);
    });

    return res;
}

const stackCollapse = (obj) => {
    const stack = [];
    let str = '';
    const res = {};

    stack.push([obj]);

    while (stack.length) {
        const [value, resultKey] = stack.pop();
        const keys = Object.keys(value);
        for (let i = keys.length - 1; i >= 0; i--) {
            const j = Array.isArray(value) ? keys.length - 1 - i : i;
            if (typeof value[keys[j]] === 'object') {
                stack.push([value[keys[j]], (resultKey || '') + keys[j] + '.']);
                continue;
            }

            res[(resultKey || '') + keys[j]] = value[keys[j]];
        }
    }

    return res;
};

const obj = {
    a: {
        b: [1, 2],
        '': {c: 2}
    }
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
// console.log(recursionCollapse(obj));
console.log(stackCollapse(obj));
