let gameSeq=[];
let userSeq=[];
let btns = ["yellow","red","purple","green"]
let score = []
let max = 0;


let started=false;
let level=0;

let h2=document.querySelector("h2")


//step 1 track keypress event
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started")
        started=true;

        levelup();
    }
})

function gameFlash(btn){
    btn.classList.add("flash")

    //will remove flash property after the given time here 250
    setTimeout(function (){
        btn.classList.remove("flash")
    },250)
}

//user ke press krne pr alag color
function userflash(btn){
    btn.classList.add("userflash")
    setTimeout(function (){
        btn.classList.remove("userflash")
    },250)
}


//level up and button flash at start
function levelup(){

    //suruwaat se user ko sb enter krna pade
    userSeq = []
    level++;
    h2.innerText=`Level ${level}`
 
    //random button choose
    let randomIdx = Math.floor(Math.random()*3)
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`)

    //as game start the color will add to game seq array []
    gameSeq.push(randomColor)
    console.log(gameSeq)
    gameFlash(randombtn)
    updateHighScore()            //call high score inside level up so it changes automatically

}

//fxn that check weather gameSeq = userSeq or not 
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout(levelup,1000)
        }
    } else {
        h2.innerHTML = `game Over ! Your Score was <b>${level}</b> <br> Press any key to start`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        reset();
    }

}

//button press ke baad ka kaam
function btnPress(){
    let btn = this;
    userflash(btn);


    //add usercolor to user seq array [] 
    userColor = btn.getAttribute("id")
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
   
}
let allBtn = document.querySelectorAll(".btn")

for(btn of allBtn){
    btn.addEventListener("click",btnPress)
}

//will reset the value of game start to false when the game is over
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}


//hint in the game

let hintContainer = document.querySelector("h3")
let btnhint = document.querySelector(".hint")
function hint(){
    hintContainer.innerText=`${gameSeq}`

}
btnhint.addEventListener("click",hint)




// High score logic automatic update 
let h = document.querySelector(".highScore");
function updateHighScore() {
    if (level > max) {
        max = level; // Update high score
    }
    h.innerText = `High Score: ${max}`; // Display high score
}

// Listen for any keypress to trigger high score update
// document.addEventListener("keydown", updateHighScore);