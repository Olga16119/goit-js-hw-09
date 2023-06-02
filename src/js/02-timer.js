import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// об'єкт параметрів
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert(`Please choose a date in the future`);
      document.querySelector(`[data-start]`).disabled = true;
    } else {
      document.querySelector(`[data-start]`).disabled = false;
    }
  },
};

// Ініціалізація flatpickr-a
const datetimePicker = flatpickr('#datetime-picker', options);

// додавання обробника подій на кнопку старт
document
  .querySelector(`[data-start]`)
  .addEventListener(`click`, onBtnStartClick);

function onBtnStartClick() {
  const selectedDate = datetimePicker.selectedDates[0];
  if (selectedDate) {
    const downCount = selectedDate - new Date();
    timerStart(downCount);
  }
}

// функція, яка запускає таймер
function timerStart(downCount) {
  const timerElem = document.querySelector('.timer');
  const btnStart = document.querySelector(`[data-start]`);
  const dateTimePicker = document.querySelector('#datetime-picker');

  btnStart.disabled = true;
  dateTimePicker.disabled = true;

  function updateTimer() {
    downCount -= 1000;
    if (downCount <= 0) {
      clearInterval(timerInterval);
      renderTimer(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(downCount);
      renderTimer(days, hours, minutes, seconds);
    }
  }
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}
// функція, яка рендерить значення таймеру
function renderTimer(days, hours, minutes, seconds) {
  const formattedDays = addLeadingZero(days);
  const formattedHours = addLeadingZero(hours);
  const formattedMinutes = addLeadingZero(minutes);
  const formattedSeconds = addLeadingZero(seconds);

  const timerElem = document.querySelector('.timer');
  timerElem.textContent = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// функція, що додає 0 до числа
function addLeadingZero(number) {
  return number.toString().padStart(2, `0`);
}

// функція, що вираховує час
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
