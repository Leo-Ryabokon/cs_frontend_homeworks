function heapSort(arr) {
    const length = arr.length;
    for (let i = length / 2 - 1; i >= 0; i--) {
        heapify(arr, i, length);
    }

    for (let i = length - 1; i >= 0; i--) {
        const temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp;

        heapify(arr, 0, i);
    }

    return arr;
}

function heapify(arr, i, length) {
    let left = i * 2 + 1;
    let right = i * 2 + 2;
    let largest = i;

    if (left < length && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < length && arr[right] > arr[largest]) {
        largest = right;
    }

    if (i !== largest) {
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        heapify(arr, largest, length);
    }
}

console.log(heapSort([20, 13, 22, 41, 5, 12, 4, 10]));
