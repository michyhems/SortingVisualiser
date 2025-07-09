export function Animate2(element, animations, animationSpeed) {
    const bars = element;
    var barId;
    var value;
    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
            [barId, value] = animations[i];
            let barOneStyle = bars[barId].style;
            barOneStyle.height = `${value}%`;
        }, i * animationSpeed);
    }
}

export function Animate(element, animations, animationSpeed) {
    const bars = element;
    var barId;
    var value;
    let index = 0;
    let stopID;
    function animateBar() {
        [barId, value] = animations[index];
        let barOneStyle = bars[barId].style;
        barOneStyle.height = `${value}%`;
        index++;
        if (index === animations.length) {
            cancelAnimationFrame(stopID);
        } else {
            window.requestAnimationFrame(animateBar);
        }
    }
    window.requestAnimationFrame(animateBar);
}
