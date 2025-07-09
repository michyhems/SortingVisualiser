export function Animate(element, animations) {
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
