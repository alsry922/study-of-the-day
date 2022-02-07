const timerBtn = document.querySelector(".timer-part__start-btn ");
const stopBtn = document.querySelector(".timer-part__stop-btn");
const timerText = document.querySelector(".timer-part__time span");

let time = 0;
let timer;
let isTimerStarted = false;

timerBtn.addEventListener("click", handleStart);
stopBtn.addEventListener("click", handleStop);

function handleStart() {
  if (isTimerStarted) return;

  isTimerStarted = true;

  timer = setInterval(() => {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 60 / 60);

    timerText.innerText = `${hours}시간 ${minutes}분 ${seconds}초`;
    time++;
  }, 1000);
}

function handleStop() {
  if (!isTimerStarted) return;

  isTimerStarted = false;

  clearInterval(timer);
}
