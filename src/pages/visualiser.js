import { useState, useEffect, useRef } from "react";
import { generate } from "./arrayGenerator";
import { bubbleSort } from "./algorithms/bubbleSort";
import { quickSort } from "./algorithms/quickSort";
import { mergeSort } from "./algorithms/mergeSort";
import { heapSort } from "./algorithms/heapSort";
import "./visualiser.css";

const Visualiser = () => {
    const [array, setArray] = useState([]);
    const [focus, setFocus] = useState("none");
    const [isComplete, setComplete] = useState(false);
    const animationInProgress = useRef(false);
    const killAnimation = useRef(false);

    useEffect(() => {
        setArray(generate());
    }, []);

    useEffect(() => {
        if (focus === "none") return;
        let algorithm = document.getElementsByClassName("algorithmButton");
        for (let i = 0; i < 4; i++) {
            if (algorithm[i].id === focus) {
                algorithm[i].classList.add("activeFocus");
            } else algorithm[i].classList.remove("activeFocus");
        }
        let short = document.getElementsByClassName("shortForm");
        if (short[0].classList.contains("hide")) return;
        let newTitle =
            focus === "bubble"
                ? "Bubble Sort"
                : focus === "quick"
                ? "Quick Sort"
                : focus === "merge"
                ? "Merge Sort"
                : focus === "heap"
                ? "Heap Sort"
                : null;
        document.getElementsByClassName("dropButton")[0].innerHTML = newTitle;
        document
            .getElementsByClassName("dropContent")[0]
            .classList.toggle("hide");
    }, [focus]);

    const sort = () => {
        if (focus === "none") return;
        if (isComplete) return;
        document
            .getElementsByClassName("sortButton")[0]
            .classList.toggle("hide");
        document
            .getElementsByClassName("stopButton")[0]
            .classList.toggle("hide");
        if (focus === "bubble") {
            Animate(bubbleSort(array));
        } else if (focus === "quick") {
            Animate(quickSort(array, 0, array.length - 1, []));
        } else if (focus === "merge") {
            Animate(mergeSort(array, 0, array.length - 1, array.slice(), []));
        } else if (focus === "heap") {
            let animations = [];
            heapSort(array, array.length - 1, animations);
            Animate(animations);
        }
    };

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
                if (killAnimation.current === true) {
                    killAnimation.current = false;
                } else {
                    setComplete(true);
                }
                cancelAnimationFrame(stopID);
                document
                    .getElementsByClassName("sortButton")[0]
                    .classList.toggle("hide");
                document
                    .getElementsByClassName("stopButton")[0]
                    .classList.toggle("hide");
            } else {
                window.requestAnimationFrame(animateBar);
            }
        }
        animationInProgress.current = true;
        window.requestAnimationFrame(animateBar);
    }

    function reset() {
        setComplete(false);
        if (animationInProgress.current === false) {
            setArray(generate());
            return;
        }
        console.log(isComplete);
        killAnimation.current = true;
        setArray(generate());
    }

    const buttons = () => {
        return (
            <div class="buttons">
                <div onClick={() => sort()} class="sortButton">
                    Sort
                </div>
                <div onClick={() => reset()} class="stopButton hide">
                    Stop
                </div>
            </div>
        );
    };

    const algorithms = () => {
        const algorithmList = () => {
            return (
                <>
                    <div
                        class="algorithmButton"
                        id="bubble"
                        onClick={() =>
                            !animationInProgress.current
                                ? setFocus("bubble")
                                : null
                        }
                    >
                        Bubble Sort
                    </div>
                    <div
                        class="algorithmButton"
                        id="quick"
                        onClick={() =>
                            !animationInProgress.current
                                ? setFocus("quick")
                                : null
                        }
                    >
                        Quick Sort
                    </div>
                    <div
                        class="algorithmButton"
                        id="merge"
                        onClick={() =>
                            !animationInProgress.current
                                ? setFocus("merge")
                                : null
                        }
                    >
                        Merge Sort
                    </div>
                    <div
                        class="algorithmButton"
                        id="heap"
                        onClick={() =>
                            !animationInProgress.current
                                ? setFocus("heap")
                                : null
                        }
                    >
                        Heap Sort
                    </div>
                </>
            );
        };

        return (
            <>
                <div class="algorithmTitles">
                    {algorithmList()}
                    {buttons()}
                </div>
                <div class="shortForm">
                    <div class="dropContainer">
                        <div class="dropButton" onClick={() => dropdown()}>
                            Algorithms
                        </div>
                        <div class="dropContent hide">{algorithmList()}</div>
                    </div>
                    {buttons()}
                </div>
            </>
        );
    };

    const dropdown = () => {
        const content = document.getElementsByClassName("dropContent");
        content[0].classList.toggle("hide");
    };

    return (
        <div class="body">
            <nav>
                <div class="title" onClick={() => reset()}>
                    SortingVisualiser
                </div>
                <div>{algorithms()}</div>
            </nav>
            <div class="graphContainer">
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
        </div>
    );
};

export default Visualiser;
