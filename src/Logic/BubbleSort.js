export default function getBubbleSort(array, animations) {
    bubbleSortHelper(array, animations);
}

function bubbleSortHelper(inputArr, animations) {
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            let animation = {comp: [], swap: []};
            animation.comp = [j, j+1];
            if (inputArr[j] > inputArr[j + 1]) {
                animation.swap = [j, j+1];
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
            }
            animations.push(animation);
        }
    }
    animations.push({comp:[], swap: []});
};