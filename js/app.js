// 변수
const SETTING_TIME = 5;
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

const runToast = (text) => {
  const option = {
    text : text,
    duration: 3000,
    newWindow: true,
    gravity: "top",
    position: "left",
    background: "linear-gradient(to right, #00b09b, #96c93d)"
  }
  Toastify(option).showToast()
};

const getWords = () => {
  axios.get(url).then(res => {
    // console.log(res);
    // filter를 이용하여 단어의 길이가 8 미만인 경우만 words에 담음 
    words = res.data.filter((word) => word.length <8);
    // console.log(words);
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
  clearInterval(timeInterval);
  if (isReaady === false) {
    return;
  }
  timeInterval = setInterval(countDown, 1000);
  score = 0;
  time = SETTING_TIME;
  wordInput.value = "";
  scoreDispaly.innerText = score;
  isPlaying = true;
}

const checkMatch = () => {
  if (!isPlaying) {
    return
  }
  // 제시한 단어와 내가 입력한 단어가 같은 경우
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    score++
    runToast(wordDisplay.innerText);
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
