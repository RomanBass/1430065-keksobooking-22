import {titleLengthHandler, titleExistenceHandler, priceValidityHandler, priceRangeHandler, priceExistenceHandler,
  selectorsSynchronizationHandler, roomsAndGuestsHandler} from './form-validation.js';
import {sendData} from './server.js';
import {TokyoCenterView} from './util.js';

const main = document.querySelector('main');
const formSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const formErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const formSuccessNotice = formSuccessTemplate.cloneNode(true);
const formErrorNotice = formErrorTemplate.cloneNode(true);
const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
const housingTypeSelector = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const entrySelector = form.querySelector('#timein');
const departureSelector = form.querySelector('#timeout');
const addressInput = form.querySelector('#address');
const roomsNumberSelector = form.querySelector('#room_number');
const guestsNumberSelector = form.querySelector('#capacity');
const formResetButton = form.querySelector('.ad-form__reset');
const formFieldSets = form.querySelectorAll('fieldset');

titleInput.addEventListener('input', titleLengthHandler);
titleInput.addEventListener('invalid', titleExistenceHandler);
housingTypeSelector.addEventListener('change', priceRangeHandler);

priceInput.addEventListener('input', () => {
  priceValidityHandler(); // валидация величины цены
});

priceInput.addEventListener('invalid', priceExistenceHandler);
departureSelector.addEventListener('change', () => {
  selectorsSynchronizationHandler(departureSelector, entrySelector);
});

entrySelector.addEventListener('change', () => {
  selectorsSynchronizationHandler(entrySelector, departureSelector);
});

roomsAndGuestsHandler(roomsNumberSelector, guestsNumberSelector);
guestsNumberSelector.addEventListener('change', () => {
  roomsAndGuestsHandler(roomsNumberSelector, guestsNumberSelector);
});
roomsNumberSelector.addEventListener('change', () => {
  roomsAndGuestsHandler(roomsNumberSelector, guestsNumberSelector);
});

export const formSubmitHandler = (callback) => {
  const formSuccessNoticeHandler = () => { // вывод сообщения об успешной отправке формы
    main.appendChild(formSuccessNotice);

    document.addEventListener('click', () => {
      if (main.contains(formSuccessNotice)) {
        main.removeChild(formSuccessNotice);
        form.reset();
        callback();
      }
    });

    document.addEventListener('keydown', (evtKeydown) => { // закрытие сообщения по нажатию esc
      if (evtKeydown.key === 'Escape' && main.contains(formSuccessNotice)) { // блокировка, чтобы не выдавалась ошибка об отсутствии дочернего элемента
        main.removeChild(formSuccessNotice);
        form.reset();
        callback();
      }
    });
  };
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formSuccessNoticeHandler, formErrorNoticeHandler, formData); // отправка данных формы на сервер
  });
};

export const formResetHandler = (callback) => {
  formResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    form.reset();
    callback();
    addressHandler(TokyoCenterView.LATITUDE, TokyoCenterView.LONGITUDE);
  });
}

const formErrorNoticeHandler = (errorMessage) => { // вывод сообщения об ошибке при формы

  const formErrorNoticeText = document.querySelector('.error__message'); // извлекаем параграф с сообщением

  main.appendChild(formErrorNotice); // добавление в блок main сообщения об ошибке
  formErrorNoticeText.textContent = errorMessage; // корректируем сообщение

  document.addEventListener('click', () => {
    if (main.contains(formErrorNotice)) {
      main.removeChild(formErrorNotice);
    }
  });

  document.addEventListener('keydown', (evtKeydown) => { // закрытие сообщения по нажатию esc
    if (evtKeydown.key === 'Escape' && main.contains(formErrorNotice)) { // блокировка, чтобы не выдавалась ошибка об отсутствии дочернего элемента
      main.removeChild(formErrorNotice);
    }
  });
};

export const addressHandler = (latitude, longitude) => {
  addressInput.value = `${latitude}, ${longitude}`; // передача начальных координат главной метки в поле адреса
};

export const formActivationHandler = (deactivator) => {
  if (deactivator) {
    form.classList.add('ad-form--disabled');

  } else {
    form.classList.remove('ad-form--disabled');
  }

  formFieldSets.forEach((fieldSet) => { // все поля формы делаются неактивными deactivator = true
    fieldSet.disabled = deactivator;
  });
};

addressInput.readOnly = true; // делаем поле адреса только для чтения
selectorsSynchronizationHandler(entrySelector, departureSelector); // синхронизация времён въезда и выезда

export {form, titleInput, housingTypeSelector, priceInput, formResetButton};
