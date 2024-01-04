export function capitalizeWords(inputString) {
    return inputString.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}