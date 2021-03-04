import {validateTitleLength, checkTitleExistence, checkPriceValidity, changeValidPriceRange, checkPriceExistence,
  makeSelectorsDependent, getConformity} from './form-validation.js';
import {sendData} from './server.js';

const formTitleInput = document.querySelector('#title');
const form = document.querySelector('.ad-form');
const formHousingTypeSelector = form.querySelector('#type');
const formPriceInput = form.querySelector('#price');
const formCheckEntrySelector = form.querySelector('#timein');
const formCheckDepartureSelector = form.querySelector('#timeout');
const formAddress = form.querySelector('#address');
const roomsNumberSelect = document.querySelector('#room_number');
const guestsNumberSelect = document.querySelector('#capacity');

formTitleInput.addEventListener('input', validateTitleLength);
formTitleInput.addEventListener('invalid', checkTitleExistence);
formHousingTypeSelector.addEventListener('change', changeValidPriceRange);

formPriceInput.addEventListener('input', () => {
  checkPriceValidity(); // валидация величины цены
});

formPriceInput.addEventListener('invalid', checkPriceExistence);
formCheckDepartureSelector.addEventListener('change', () => {
  makeSelectorsDependent(formCheckDepartureSelector, formCheckEntrySelector);
});

formCheckEntrySelector.addEventListener('change', () => {
  makeSelectorsDependent(formCheckEntrySelector, formCheckDepartureSelector);
});

getConformity(roomsNumberSelect, guestsNumberSelect);
guestsNumberSelect.addEventListener('change', function () {
  getConformity(roomsNumberSelect, guestsNumberSelect);
});
roomsNumberSelect.addEventListener('change', function () {
  getConformity(roomsNumberSelect, guestsNumberSelect);
});

const main = document.querySelector('main');
const formSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const formSuccessNotice = formSuccessTemplate.cloneNode(true);
const formErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const formErrorNotice = formErrorTemplate.cloneNode(true);

const throwFormSuccessNotice = (resetMainPinPosition) => { // вывод сообщения об успешной отправке формы
  main.appendChild(formSuccessNotice);

  document.addEventListener('click', () => {
    if (main.contains(formSuccessNotice)) {
      main.removeChild(formSuccessNotice);
      form.reset();
      resetMainPinPosition();
    }
  });
};

export const setFormSubmitHandler = (callback) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(() => {throwFormSuccessNotice(callback)}, throwFormErrorNotice, formData); // отправка данных формы на сервер
  });
};

const throwFormErrorNotice = (errorMessage) => { // вывод сообщения об ошибке при формы
  main.appendChild(formErrorNotice);
  const formErrorNoticeText = document.querySelector('.error__message'); // извлекаем параграф с сообщением
  formErrorNoticeText.textContent = errorMessage; // корректируем сообщение

  document.addEventListener('click', () => {
    if (main.contains(formErrorNotice)) {
      main.removeChild(formErrorNotice);
    }
  });
};

export const fillFormAddress = (latitude, longitude) => {
  formAddress.value = `${latitude}, ${longitude}`; // передача начальных координат главной метки в поле адреса
};

//const form = document.querySelector('.ad-form');
const formFieldSets = form.querySelectorAll('fieldset');

export const switchFormActivation = (deactivator) => {
  if (deactivator) {
    form.classList.add('ad-form--disabled');

  } else {
    form.classList.remove('ad-form--disabled');
  // filterForm.classList.remove('map__filters--disabled');
  }

  formFieldSets.forEach((fieldSet) => { // все поля формы делаются неактивными deactivator = true
    fieldSet.disabled = deactivator;
  });
};
