export default function getInsertionSort(inputArr, animations) {
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j] > key) {
            let animation = {
                action: 'overwrite',
                num: [j, i]
            };
            animations.push(animation);
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        inputArr[j + 1] = key;
        animations.push({
            action: 'swap',
            num: [j + 1, key]
        });
    }
};