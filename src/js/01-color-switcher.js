const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.body,
};

let idInterval = 0;

refs.btnStart.addEventListener(`click`, onButtonStartClick);
refs.btnStop.addEventListener(`click`, onButtonStopClick);

function onButtonStartClick() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  idInterval = setInterval(changeColorBody, 1000);
}

function onButtonStopClick() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(idInterval);
}

function changeColorBody() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
refs.btnStop.disabled = true;
