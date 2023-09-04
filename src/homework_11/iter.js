function* iter(str) {
    const surrogate = [];
    const diacritical = [];

    for (let i = 0; i < str.length; i++) {
        const point = str[i].codePointAt(0);
        if (point >= 0xd800 && point <= 0xdbff) {
            surrogate.push(str[i]);
        } else if (point >= 0xdc00 && point <= 0xdfff) {
            surrogate.push(str[i]);
            console.log('surrogate',  surrogate.join(''));
            yield surrogate.join('');
        } else if (point >= 0x0300 && point <= 0x036F) {
            diacritical.push(str[i - 1]);
            diacritical.push(str[i]);
            console.log('diacritical',  diacritical.join(''));
            yield diacritical.join('');
        }
        else {
            yield str[i];
        }
    }
}

// console.log([...iter('😀')]) // ['😀']
console.log([...iter('1😃à🇷🇺👩🏽‍❤️‍💋‍👨')]) // ['1', '😃', 'à', '🇷🇺', '👩🏽‍❤️‍💋‍👨']
