// 변수
const SETTING_TIME = 5;
let words = ["banana", "apple", "pencil", "note", "book", "home"];
let time;
let score = 0;
let isPlaying = false;
let timeInterval;

const wordDisplay = document.querySelector(".word-display");
const wordInput = document.querySelector(".word-input");
const timeDispaly = document.querySelector(".time");
const scoreDispaly = document.querySelector(".score");
const button = document.querySelector(".button");

time = 20;

// function
const countDown = () => {
  if(time > 0) {
    time--;
    clearInterval(timeInterval);
  }
  timeDispaly.innerText = time;
}

const run = () => {
  timeInterval = setInterval(countDown, 1000);
}

const checkMatch = () => {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    score++
    wordInput.value = "";
    const randomIndex = Math.floor(Math.random()*words.length);
    wordDisplay.innerText = words[randomIndex];
  }
  scoreDispaly.innerText = score;
}


// event handler
wordInput.addEventListener("input", checkMatch);
// button.addEventListener("click", run);