import { useState, useEffect } from "react";
import { generate } from "./arrayGenerator";
import { animateBubbleSort } from "./algorithms/bubbleSort";
import { animateQuickSort } from "./algorithms/quickSort";
import { animateMerge } from "./algorithms/mergeSort";
import { animateHeapSort } from "./algorithms/heapSort";

const Visualiser = () => {
    const [array, setArray] = useState([]);
    const [focus, setFocus] = useState("none");

    useEffect(() => {
        setArray(generate());
    }, []);

    function sort() {
        if (focus === "none") return;
        let bars = document.getElementsByClassName("bar");
        if (focus === "bubbleSort") {
            animateBubbleSort(array, bars);
        } else if (focus === "quickSort") {
            animateQuickSort(array, bars);
        } else if (focus === "mergeSort") {
            animateMerge(array, bars);
        } else if (focus === "heapSort") {
            animateHeapSort(array, bars);
        }
    }

    return (
        <>
            <h1 id="title">Sorting Visualiser</h1>
            <div class="container">
                {array.map((value, index) => (
                    <div
                        class="bar"
                        id={index}
                        style={{
                            height: `${value}%`,
                            width: "0.5%",
                        }}
                    ></div>
                ))}
            </div>
            <div class="buttons">
                <div
                    class="algorithmButton"
                    id="bubbleSort"
                    onClick={() => setFocus("bubbleSort")}
                    style={{
                        backgroundColor:
                            focus === "bubbleSort" ? "green" : null,
                        color: focus === "bubbleSort" ? "black" : null,
                    }}
                >
                    <p>Bubble Sort</p>
                </div>
                <div
                    class="algorithmButton"
                    id="quickSort"
                    onClick={() => setFocus("quickSort")}
                    style={{
                        backgroundColor: focus === "quickSort" ? "green" : null,
                        color: focus === "quickSort" ? "black" : null,
                    }}
                >
                    <p>Quick Sort</p>
                </div>
                <div
                    class="algorithmButton"
                    id="heapSort"
                    onClick={() => setFocus("heapSort")}
                    style={{
                        backgroundColor: focus === "heapSort" ? "green" : null,
                        color: focus === "heapSort" ? "black" : null,
                    }}
                >
                    <p>Heap Sort</p>
                </div>
                <div
                    class="algorithmButton"
                    id="mergeSort"
                    onClick={() => setFocus("mergeSort")}
                    style={{
                        backgroundColor: focus === "mergeSort" ? "green" : null,
                        color: focus === "mergeSort" ? "black" : null,
                    }}
                >
                    <p>Merge Sort</p>
                </div>
                <div class="longButton" id="sortButton" onClick={() => sort()}>
                    <p>Sort</p>
                </div>
                <div
                    class="longButton"
                    id="newArray"
                    onClick={() => setArray(generate())}
                >
                    <p>Generate New Graph</p>
                </div>
            </div>
        </>
    );
};

export default Visualiser;
