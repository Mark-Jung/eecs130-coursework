const redElement = document.getElementById("red");
const yellowElement = document.getElementById("yellow");
const blueElement = document.getElementById("blue");

const updateColor = (ev) => {
    /*
    INSTRUCTIONS: Update this function as follows:
    If red is turned on, make the background red.
    If yellow is turned on, make the background yellow.
    If blue is turned on, make the background blue.
    If red and yellow are both turned on, make the background orange.
    If red and blue are turned on, make the background purple.
    If yellow and blue are turned on, make the background green.
    If everything is turned on, then make the background black.
    */
    var color = "white";
    var isRed = redElement.value === 'ON';
    var isYellow = yellowElement.value === 'ON';
    var isBlue = blueElement.value === 'ON';
    if (isRed && isYellow && isBlue) {
        color = "black";
    } else if (isYellow && isBlue) {
        color = "green";
    } else if (isRed && isBlue) {
        color = "purple";
    } else if (isRed && isYellow) {
        color = "orange";
    } else if (isBlue) {
        color = "blue";
    } else if (isRed) {
        color = "red";
    } else if (isYellow) {
        color = "yellow";
    }
    document.body.style.backgroundColor = color;
};

redElement.onchange = updateColor;
yellowElement.onchange = updateColor;
blueElement.onchange = updateColor;
