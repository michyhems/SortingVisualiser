import { Animate } from "./animateSorting";

function heapify(arr, n, i, animations) {
    let largest = i;

    let l = 2 * i + 1;

    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) {
        largest = l;
    }

    if (r < n && arr[r] > arr[largest]) {
        largest = r;
    }

    if (largest !== i) {
        let temp = arr[i]; // Swap
        animations.push([i, arr[largest]]);
        animations.push([largest, arr[i]]);
        arr[i] = arr[largest];
        arr[largest] = temp;

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest, animations);
    }
}

// Main function to do heap sort
function heapSort(arr) {
    let n = arr.length;
    let animations = [];
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, animations);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        animations.push([i, arr[0]]);
        animations.push([0, arr[i]]);
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // Call max heapify on the reduced heap
        heapify(arr, i, 0, animations);
    }
    return animations;
}

export function animateHeapSort(array, element) {
    const animations = heapSort(array);
    Animate(element, animations, 15);
}
