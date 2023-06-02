import Notiflix from 'notiflix';

// посилання на елементи
const formEl = document.querySelector(`.form`);

// додаємо обробника подій на форму
formEl.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const inputDelay = document.querySelector('input[name="delay"]');
  const inputStep = document.querySelector('input[name="step"]');
  const inputAmount = document.querySelector('input[name="amount"]');

  const delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);

  inputDelay.value = '';
  inputStep.value = '';
  inputAmount.value = '';

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    createPromise(position, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
