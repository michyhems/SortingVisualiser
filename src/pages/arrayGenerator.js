export function generate() {
    let array = [];
    for (let i = 0; i < 100; i++) {
        array[i] = i + 1;
    }
    return shuffle(array);
}

function shuffle(array) {
    let index;
    for (let i = 0; i < array.length; i++) {
        index = Math.floor(Math.random() * i);
        [array[index], array[i]] = [array[i], array[index]];
    }
    return array;
}
