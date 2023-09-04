function isDigit(str) {
    if (typeof str !== 'string') {
        return new TypeError('Data should be a string.');
    }

    let res = false;
    const arabic = [];
    const roman = [];

    // arabic
    for (let i = 48; i<=57; i++) {
        arabic.push(i);
    }

    // roman
    for (let i = 8544; i<=8559; i++) {
        roman.push(i);
    }

    if (arabic.includes(str[0].codePointAt(0))) {
        res = true;

        for (let char of str) {
            if (!arabic.includes(char.codePointAt(0))) {
                if (roman.includes(char.codePointAt(0))) {
                    throw new Error('String should include only arabic number');
                }

                return false;
            }
        }
    } else if (roman.includes(str[0].codePointAt(0))) {
        res = true;

        for (let char of str) {
            if (!roman.includes(char.codePointAt(0))) {
                if (arabic.includes(char.codePointAt(0))) {
                    throw new Error('String should include only roman number');
                }

                return false;
            }
        }
    }

    return res;
}

console.log(isDigit('123')) // true
console.log(isDigit('Ⅻ'))  // true
console.log(isDigit('123w'))  // false

