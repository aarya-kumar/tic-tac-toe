let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".new"); 
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector(".msg"); 

let turnX = true;
let count = 0; 

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    count = 0; 
    turnX = true;
    enableBoxes(); 
    msgContainer.classList.add("hide"); 
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnX = false;
        }
        else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true; 
        count++; 
        console.log(count); 
        let isWinner = checkWinner(); 
        if(count === 9 && !isWinner){
            gameDraw(); 
        }
    });
}); 

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    count = 0; 
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true; 
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false; 
        box.innerText = ""; 
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`; 
    msgContainer.classList.remove("hide"); 
    disableBoxes(); 
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText; 
        let pos2val = boxes[pattern[1]].innerText; 
        let pos3val = boxes[pattern[2]].innerText; 

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val); 
            }
        }
    }
}; 

newBtn.addEventListener("click",resetGame); 
resetBtn.addEventListener("click",resetGame); 