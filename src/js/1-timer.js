import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  dateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

const datePicker = flatpickr(elements.dateInput, options);

let userSelectedDate;

function setTimer(selectedDates) {
  if (selectedDates[0].getTime() > Date.now()) {
    elements.startButton.removeAttribute('disabled');
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate.getTime() - Date.now());
  } else {
    elements.startButton.setAttribute('disabled', '');
    alert('Please choose a date in the future');
  }
}

datePicker.config.onClose.push(setTimer);

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

console.log(convertMs(82611693));
