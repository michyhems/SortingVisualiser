const TextContext = (algorithm) => {
    if (algorithm === "bubbleSort") {
        return [
            " O(n<sup>2</sup>)\n",
            " O(1)\n",
            " True\n",
            " Flase\n",
            "-Easy to implement\n" + "-No additional memory required\n",
            "-Slow, particularly for large datasets\n" +
                "-Minimal applicaiton use\n",
        ];
    } else if (algorithm === "quickSort") {
        return [
            "\n-Best Case: \u03A9(n log n)\n" +
                "-Average Case: \u03B8(n log n)\n" +
                "-Worst Case: O(n<sup>2</sup>)\n",
            " O(n)\n",
            " False\n",
            " True\n",
            "-Efficient on large data sets\n" +
                "-Minimal memory requirements\n",
            "-Very slow worst case\n",
        ];
    } else if (algorithm === "mergeSort") {
        return [
            "\n-Best Case: O(n log n)\n" +
                "-Average Case: O(n log n)\n" +
                "-Worst Case: O(n log n)\n",
            " O(n)\n",
            " True\n",
            " True\n",
            "-Worst case performance is fixed and is able to perform well even with large data sets\n" +
                "-Easy to implement\n" +
                "-Suitable for parrellel processing\n" +
                "-Mainly applied for large data sets\n",
            "-High memory cost\n" + "-Slow",
        ];
    } else if (algorithm === "heapSort") {
        return [
            " O(n log n)\n",
            " O(log n)\n",
            " False\n",
            " False\n",
            "-Effiecient time coplexity\n" +
                "-Suitable for large data sets" +
                "-Simple to understand from a developer point of view\n",
            "-High memory cost\n" + "-Slow",
        ];
    }
};

export const Text = (algorithm) => {
    if (algorithm === "Select") {
        return "Select an algorithm and click the 'Sort' button. Then click 'New Graph' to generate a new unsorted array to sort.";
    }
    let text = TextContext(algorithm);
    return (
        "Time Complexity:" +
        text[0] +
        "Auxilary Space:" +
        text[1] +
        "Stable:" +
        text[2] +
        "Divide and Conquer:" +
        text[3] +
        "Advantages:\n" +
        text[4] +
        "Disadvantages:\n" +
        text[5]
    );
};
