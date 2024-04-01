import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  dateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours'),
  minutesValue: document.querySelector('[data-minutes'),
  secondsValue: document.querySelector('[data-seconds'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

const datePicker = flatpickr(elements.dateInput, options);

let userSelectedTime;

function setTimer(selectedDates) {
  if (selectedDates[0].getTime() > Date.now()) {
    elements.startButton.removeAttribute('disabled');

    userSelectedTime = selectedDates[0].getTime() - Date.now();
  } else {
    elements.startButton.setAttribute('disabled', '');

    iziToast.show({
      message: 'Please choose a date in the future',
      messageColor: '#fff',
      backgroundColor: '#ff3333',
      position: 'topRight',
    });
  }
}

datePicker.config.onClose.push(setTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(timeValue) {
  if (timeValue < 10) {
    return timeValue.toString().padStart(2, '0');
  }
  return timeValue;
}

elements.startButton.addEventListener('click', () => {
  elements.startButton.setAttribute('disabled', '');
  elements.dateInput.setAttribute('disabled', '');

  const timerInterval = setInterval(() => {
    const currentTimerValue = convertMs(userSelectedTime);

    elements.daysValue.textContent = addLeadingZero(currentTimerValue.days);
    elements.hoursValue.textContent = addLeadingZero(currentTimerValue.hours);
    elements.minutesValue.textContent = addLeadingZero(
      currentTimerValue.minutes
    );
    elements.secondsValue.textContent = addLeadingZero(
      currentTimerValue.seconds
    );

    userSelectedTime -= 1000;

    if (
      elements.daysValue.textContent === '00' &&
      elements.hoursValue.textContent === '00' &&
      elements.minutesValue.textContent === '00' &&
      elements.secondsValue.textContent === '00'
    ) {
      clearInterval(timerInterval);
    }
  }, 1000);
});
