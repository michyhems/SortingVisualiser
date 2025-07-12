function heapify(array, startIndex, animations) {
    let parentIndex;
    let placeHolder;
    for (let i = startIndex; i > 0; i--) {
        parentIndex = Math.floor((i - 1) / 2);
        if (array[parentIndex] < array[i]) {
            animations.push([i, array[parentIndex]]);
            animations.push([parentIndex, array[i]]);
            placeHolder = array[parentIndex];
            array[parentIndex] = array[i];
            array[i] = placeHolder;
        }
    }
    return array;
}

export function heapSort(array, startIndex, animations) {
    if (startIndex === 0) {
        return animations;
    }
    let heap = heapify(array, startIndex, animations);
    animations.push([0, array[startIndex]]);
    animations.push([startIndex, array[0]]);
    let placeHolder = heap[0];
    heap[0] = heap[startIndex];
    heap[startIndex] = placeHolder;
    startIndex--;
    heapSort(heap, startIndex, animations);
}
