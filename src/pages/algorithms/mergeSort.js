import { Animate } from "./animateSorting";

function mergeSort(array, startIndex, endIndex, arrayCopy, animations) {
    if (startIndex === endIndex) return;
    let midIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSort(arrayCopy, startIndex, midIndex, array, animations);
    mergeSort(arrayCopy, midIndex + 1, endIndex, array, animations);
    merge(array, startIndex, midIndex, endIndex, arrayCopy, animations);
    return animations;
}

function merge(array, startIndex, midIndex, endIndex, arrayCopy, animations) {
    let k = startIndex;
    let i = startIndex;
    let j = midIndex + 1;
    while (i <= midIndex && j <= endIndex) {
        if (arrayCopy[i] <= arrayCopy[j]) {
            array[k] = arrayCopy[i];
            animations.push([k, arrayCopy[i]]);
            i++;
        } else {
            array[k] = arrayCopy[j];
            animations.push([k, arrayCopy[j]]);
            j++;
        }
        k++;
    }
    while (i <= midIndex) {
        array[k] = arrayCopy[i];
        animations.push([k, arrayCopy[i]]);
        k++;
        i++;
    }
    while (j <= endIndex) {
        array[k] = arrayCopy[j];
        animations.push([k, arrayCopy[j]]);
        k++;
        j++;
    }
}

export function animateMerge(array, element) {
    let arrayCopy = array.slice();
    let animations = mergeSort(array, 0, array.length - 1, arrayCopy, []);
    Animate(element, animations);
}
