function partition(array, startIndex, endIndex, animations) {
    let pivot = array[endIndex];
    let i = startIndex - 1;
    let placeHolder;
    for (let j = startIndex; j < endIndex; j++) {
        if (array[j] < pivot) {
            i++;
            animations.push([i, array[j]]);
            animations.push([j, array[i]]);
            placeHolder = array[j];
            array[j] = array[i];
            array[i] = placeHolder;
        }
    }
    i++;
    animations.push([i, array[endIndex]]);
    animations.push([endIndex, array[i]]);
    array[endIndex] = array[i];
    array[i] = pivot;

    return i;
}

export function quickSort(array, startIndex, endIndex, animations) {
    if (startIndex < endIndex) {
        let pivot = partition(array, startIndex, endIndex, animations);
        quickSort(array, startIndex, pivot - 1, animations);
        quickSort(array, pivot + 1, endIndex, animations);
    }
    return animations;
}
