let gameSeq=[];
let userSeq=[];

let btns=["pink","orange","blue","yellow"];

let highscore=0;

let started=false;
let level = 0;

let h3=document.querySelector("h3");
let h2=document.querySelector("h2");

document.addEventListener("click",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },300);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },200);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;

    // flash the color box
    let randIdx= Math.floor(Math.random()*4);
    let randColor= btns[randIdx];
    let randBtn=document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn); 
}

function checkAns(idx){
    // console.log("curr level:",level);
    // let idx=level-1;
    
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,600);
        }
    }else{
        h3.innerHTML=`Game over! Your score is <b>${level-1}</b> <br> Please start over`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor="white";
        },300);
        setTimeout(reset, 2000); 

        if(level-1>=highscore){
            highscore=level-1;
            h2.innerText=`highscore:${highscore}`;
        }
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    // console.log(this);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}