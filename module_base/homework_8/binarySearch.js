function bisecLeft(arr, cb) {
    let res = -1;

    if (arr.length === 0) {
        return res;
    }

    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const val = cb(arr[mid]);

        if (val === 0) {
            res = mid;
        }

        if (val >= 0) {
            end = mid - 1;
            continue;
        }

        start = mid + 1;
    }

    return res;
}

function bisecRight(arr, cb) {
    let res = -1;

    if (arr.length === 0) {
        return res;
    }

    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const val = cb(arr[mid]);

        if (val === 0) {
            res = mid;
        }

        if (val <= 0) {
            start = mid + 1;
            continue;
        }

        end = mid - 1;
    }

    return res;
}

// Находит первый индекс элемента
console.log(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7));  // 6

// Находит последний индекс элемента
console.log(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)); // 9
