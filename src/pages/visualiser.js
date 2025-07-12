import { useState, useEffect, useRef } from "react";
import { generate } from "./arrayGenerator";
import { bubbleSort } from "./algorithms/bubbleSort";
import { quickSort } from "./algorithms/quickSort";
import { mergeSort } from "./algorithms/mergeSort";
import { heapSort } from "./algorithms/heapSort";
import { Text } from "./algorithms/text";

const Visualiser = () => {
    const [array, setArray] = useState([]);
    const [focus, setFocus] = useState("Select");
    const animationInProgress = useRef(false);
    const killAnimation = useRef(false);

    useEffect(() => {
        setArray(generate());
    }, []);

    const algorithmName = () => {
        return focus === "Select"
            ? "Select"
            : focus === "bubbleSort"
            ? "Bubble Sort"
            : focus === "quickSort"
            ? "Quick Sort"
            : focus === "mergeSort"
            ? "Merge Sort"
            : "Heap Sort";
    };

    function sort() {
        if (focus === "Select") return;
        let bars = document.getElementsByClassName("bar");
        if (focus === "bubbleSort") {
            Animate(bubbleSort(array));
        } else if (focus === "quickSort") {
            Animate(quickSort(array, 0, array.length - 1, []));
        } else if (focus === "mergeSort") {
            Animate(mergeSort(array, 0, array.length - 1, array.slice(), []));
        } else if (focus === "heapSort") {
            let animations = [];
            heapSort(array, array.length - 1, animations);
            Animate(animations);
        }
    }

    function Animate(animations) {
        let bars = document.getElementsByClassName("bar");
        var barId;
        var value;
        let index = 0;
        let stopID;
        let bar;
        let barStyle;
        let length = animations.length;
        function animateBar() {
            [barId, value] = animations[index];
            bar = bars[barId];
            barStyle = bar.style;
            barStyle.height = `${value}%`;
            index++;
            if (index === length || killAnimation.current === true) {
                animationInProgress.current = false;
                killAnimation.current = false;
                cancelAnimationFrame(stopID);
            } else {
                window.requestAnimationFrame(animateBar);
            }
        }
        animationInProgress.current = true;
        window.requestAnimationFrame(animateBar);
    }

    function reset() {
        if (!animationInProgress.current) setArray(generate());
        killAnimation.current = true;
        setArray(generate());
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
            <div class="console">
                <div class="buttonRow">
                    <div class="dropdown">
                        <div class="dropdownButton" tabIndex="1">
                            {algorithmName()}
                        </div>
                        <div class="menu">
                            <div
                                id="bubbleSort"
                                class="menuItem"
                                onClick={() => setFocus("bubbleSort")}
                            >
                                Bubble Sort
                            </div>
                            <div
                                id="quickSort"
                                class="menuItem"
                                onClick={() => setFocus("quickSort")}
                            >
                                Quick Sort
                            </div>
                            <div
                                id="mergeSort"
                                class="menuItem"
                                onClick={() => setFocus("mergeSort")}
                            >
                                Merge Sort
                            </div>
                            <div
                                id="heapSort"
                                class="menuItem"
                                onClick={() => setFocus("heapSort")}
                            >
                                Heap Sort
                            </div>
                        </div>
                    </div>
                    <div class="sort" onClick={() => sort()}>
                        Sort
                    </div>
                    <div class="newGraph" onClick={() => reset()}>
                        New Graph
                    </div>
                </div>

                <div class="textBox">
                    <div class="text">{Text(focus)}</div>
                </div>
            </div>
        </>
    );
};

export default Visualiser;
