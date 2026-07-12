const boxes = document.querySelectorAll(".para");
const playerXBtn = document.getElementById("cross");
const playerOBtn = document.getElementById("circle");
const refreshBtn = document.getElementById("refresh");


let selectedBox = null;
let currentPlayer = "X";
let gameOver = false;
// selectedBox.style.fontSize = "50px";
// selectedBox.style.textAlign = "center";

// Winner message
const winnerText = document.createElement("h2");
winnerText.style.color = "white";
winnerText.style.textAlign = "center";
document.querySelector(".display").appendChild(winnerText);

// Current player display
const turnText = document.createElement("h3");
turnText.style.color = "white";
turnText.style.textAlign = "center";
turnText.innerText = "Current Player : X";
document.querySelector(".display").appendChild(turnText);

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
];

// Box select
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (gameOver) return;

        boxes.forEach((b) => {
            b.style.outline = "none";
        });

        selectedBox = box;
        box.style.outline = "3px solid white";
    });
});

// X button
playerXBtn.addEventListener("click", () => {

    if (
        gameOver ||
        currentPlayer !== "X" ||
        !selectedBox ||
        selectedBox.innerText !== ""
    ) {
        return;
    }

    selectedBox.innerText = "X";
    selectedBox.style.fontSize = "50px";
    selectedBox.style.textAlign = "center";

    selectedBox.style.outline = "none";
    selectedBox = null;

    if (!checkWinner()) {
        currentPlayer = "O";
        turnText.innerText = "Current Player : O";
    }
});

// O button
playerOBtn.addEventListener("click", () => {

    if (
        gameOver ||
        currentPlayer !== "O" ||
        !selectedBox ||
        selectedBox.innerText !== ""
    ) {
        return;
    }

    selectedBox.innerText = "O";
    selectedBox.style.fontSize = "50px";
    selectedBox.style.textAlign = "center";

    selectedBox.style.outline = "none";
    selectedBox = null;

    if (!checkWinner()) {
        currentPlayer = "X";
        turnText.innerText = "Current Player : X";
    }
});

// Winner Check
function checkWinner() {

    for (let pattern of winPatterns) {

        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (
            val1 !== "" &&
            val1 === val2 &&
            val2 === val3
        ) {

            winnerText.innerText = `🎉 Winner is ${val1}`;
            gameOver = true;

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            return true;
        }
    }

    // Draw check
    let filled = true;

    boxes.forEach((box) => {
        if (box.innerText === "") {
            filled = false;
        }
    });

    if (filled) {
        winnerText.innerText = "Match Draw!";
        gameOver = true;
        return true;
    }

    return false;
}

// Refresh button
refreshBtn.addEventListener("click", () => {

    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
        box.style.outline = "none";
    });

    selectedBox = null;
    currentPlayer = "X";
    gameOver = false;

    turnText.innerText = "Current Player : X";
    winnerText.innerText = "";
});