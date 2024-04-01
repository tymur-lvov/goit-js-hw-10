import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  notificationForm: document.querySelector('form'),
  delayInput: document.querySelector('[name="delay"]'),
  fulfilledRadio: document.querySelector('[value="fulfilled"]'),
  rejectedRadio: document.querySelector('[value="rejected"]'),
  createBtn: document.querySelector('button'),
};
3000;

const values = {
  inputValue: null,
  radioValue: null,
};

elements.notificationForm.addEventListener('submit', event => {
  event.preventDefault();
  values.inputValue = Number(elements.notificationForm.elements.delay.value);
  values.radioValue = elements.notificationForm.elements.state.value;
  createPromise(values)
    .then(fulfilledValue =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${fulfilledValue}ms`,
        messageColor: '#fff',
        backgroundColor: '#326101',
        position: 'topRight',
      })
    )
    .catch(rejectedValue =>
      iziToast.show({
        message: `❌ Rejected promise in ${rejectedValue}ms`,
        messageColor: '#fff',
        backgroundColor: '#ff3333',
        position: 'topRight',
      })
    );
});

const createPromise = ({ inputValue, radioValue }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioValue === 'fulfilled') {
        resolve(inputValue);
      } else {
        reject(inputValue);
      }
    }, inputValue);
  });
};
