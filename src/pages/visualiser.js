import { useState, useEffect, useRef } from "react";
import { generate } from "./arrayGenerator";
import { bubbleSort } from "./algorithms/bubbleSort";
import { quickSort } from "./algorithms/quickSort";
import { mergeSort } from "./algorithms/mergeSort";
import { heapSort } from "./algorithms/heapSort";
import "./visualiser.css";

const Visualiser = () => {
    //setting up global variables
    const [array, setArray] = useState([]);
    const [focus, setFocus] = useState("none");
    const [isComplete, setComplete] = useState(false);
    const animationInProgress = useRef(false);
    const killAnimation = useRef(false);

    //generating graph values
    useEffect(() => {
        setArray(generate());
    }, []);

    //Update the UI based on the user's selection of algorithm
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

    //Applies a shaking animation on the title (reset button) when the animation is complete
    useEffect(() => {
        document.getElementsByClassName("title")[0].classList.toggle("shake");
    }, [isComplete]);

    //parses the appropriate inputs to the animation function
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

    //function that animates the graph
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
                //in case the reset button or the stop button is pressed while animation is running.
                animationInProgress.current = false;
                if (killAnimation.current === true) {
                    killAnimation.current = false;
                } else {
                    setComplete(true);
                }
                cancelAnimationFrame(stopID);
                //hides the sort button when animation is running.
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

    //resets the graph
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

    //the sort and stop animation buttons
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

    //UI component through which the user can choose an algorithm
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
        //the buttons and the UI component and displayed in the nav bar in the default and low
        //width versions
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

    //funciton to hide the dropdown menu (use in low width settings)
    const dropdown = () => {
        const content = document.getElementsByClassName("dropContent");
        content[0].classList.toggle("hide");
    };

    //where all components are assembled.
    return (
        <div class="body">
            <nav>
                <div class="title shake" onClick={() => reset()}>
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
