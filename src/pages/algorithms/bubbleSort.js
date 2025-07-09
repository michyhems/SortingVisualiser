import { Animate } from "./animateSorting";

function bubbleSort(array) {
    let isSorted = false;
    let animations = [];
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                if (isSorted) isSorted = false;
                animations.push([i, array[i + 1]]);
                animations.push([i + 1, array[i]]);
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
            }
        }
    }
    return animations;
}

export function animateBubbleSort(array, element) {
    const animations = bubbleSort(array);
    Animate(element, animations, 5);
}
