// 변수
const SETTING_TIME = 7;
let words = ["banana", "apple", "pencil", "note", "book", "home"];
let time;
let score = 0;
let isReaady = false;
let isPlaying = false;
let timeInterval;

const wordDisplay = document.querySelector(".word-display");
const wordInput = document.querySelector(".word-input");
const timeDispaly = document.querySelector(".time");
const scoreDispaly = document.querySelector(".score");
const button = document.querySelector(".button");

time = 20;

const url = 'https://random-word-api.herokuapp.com/word?number=100';

const getWords = () => {
  axios.get(url).then(res => {
    words = res.data.filter((word) => word.length <8);
    button.innerText = "게임시작";
    button.classList.remove("loading");
    isReaady = true;
  }).catch(err=>console.log(err));
}

// init
const init = () => {
  time = SETTING_TIME;
  getWords();
}

// function
const countDown = () => {
  if(time > 0) {
    time--;
  }
  else {
    clearInterval(timeInterval);
    isPlaying = false;
  }
  timeDispaly.innerText = time;
}

const run = () => {
  if (isReaady === false) {
    return;
  }
  timeInterval = setInterval(countDown, 1000);
  score = 0;
  wordInput.value = "";
  scoreDispaly.innerText = score;
  isPlaying = true;
}

const checkMatch = () => {
  if (!isPlaying) {
    return
  }
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    score++
    time = SETTING_TIME;
    wordInput.value = "";
    const randomIndex = Math.floor(Math.random()*words.length);
    wordDisplay.innerText = words[randomIndex];
  }
  scoreDispaly.innerText = score;
}


// event handler
wordInput.addEventListener("input", checkMatch);

// get ready
init();
