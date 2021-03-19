import {titleInputHandler, titleInvalidHandler, priceInputHandler, PriceRangeChangeHandler, priceInvalidHandler,
  synchronizeSelectors, matchRoomsAndGuests} from './form-validation.js';
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

titleInput.addEventListener('input', titleInputHandler);
titleInput.addEventListener('invalid', titleInvalidHandler);
housingTypeSelector.addEventListener('change', PriceRangeChangeHandler);
priceInput.addEventListener('input', priceInputHandler); // валидация величины цены

priceInput.addEventListener('invalid', priceInvalidHandler);
departureSelector.addEventListener('change', () => {
  synchronizeSelectors(departureSelector, entrySelector);
});

entrySelector.addEventListener('change', () => {
  synchronizeSelectors(entrySelector, departureSelector);
});

matchRoomsAndGuests(roomsNumberSelector, guestsNumberSelector);
guestsNumberSelector.addEventListener('change', () => {
  matchRoomsAndGuests(roomsNumberSelector, guestsNumberSelector);
});
roomsNumberSelector.addEventListener('change', () => {
  matchRoomsAndGuests(roomsNumberSelector, guestsNumberSelector);
});

export const handleFormSubmission = (callback) => {
  const throwSuccessNotice = () => { // вывод сообщения об успешной отправке формы
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
    sendData(throwSuccessNotice, throwErrorNotice, formData); // отправка данных формы на сервер
  });
};

export const setFormResetHandler = (callback) => {
  formResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    form.reset();
    callback();
    setAddress(TokyoCenterView.LATITUDE, TokyoCenterView.LONGITUDE);
  });
}

const throwErrorNotice = (errorMessage) => { // вывод сообщения об ошибке при формы

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

export const setAddress = (latitude, longitude) => {
  addressInput.value = `${latitude}, ${longitude}`; // передача начальных координат главной метки в поле адреса
};

export const deactivateForm = (deactivator) => {
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
synchronizeSelectors(entrySelector, departureSelector); // синхронизация времён въезда и выезда

export {form, titleInput, housingTypeSelector, priceInput, formResetButton};
