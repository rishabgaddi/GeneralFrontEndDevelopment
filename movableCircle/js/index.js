let redCircle = document.getElementById('redCircle');
let counterEle = document.getElementById('counter-tag');
let timerEle = document.getElementById('timer');
let resetButton = document.getElementById('reste-btn');
let counter = 0;
let bestScore = 0;
let timer = 15000;

setInterval(() => {
  if (parseInt(timerEle.innerText) > 0) {
    timerEle.innerText = timerEle.innerText - 1;
  }
}, 1000);

// Move the circle randomly
redCircle.addEventListener('click', (e) => {
  if (timerEle.innerText > 0) {
    let x = Math.floor(Math.random() * window.innerWidth) - 50;
    let y = Math.floor(Math.random() * window.innerHeight) - 50;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    redCircle.style.left = x + 'px';
    redCircle.style.top = y + 'px';
    counter++;
    counterEle.innerText = counter;
    if (counter > bestScore) {
      bestScore = counter;
      document.getElementById('best-score').innerText = bestScore;
    }
  }
});

resetButton.addEventListener('click', (e) => {
  timerEle.innerText = 15;
  counter = 0;
});