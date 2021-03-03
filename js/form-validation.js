const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MAX_PRICE = 1000000;
const formTitleInput = document.querySelector('#title');
const form = document.querySelector('.ad-form');
//const formHousingTypeSelector = form.querySelector('#type');
const formPriceInput = form.querySelector('#price');
const formCheckEntrySelector = form.querySelector('#timein');
const formCheckDepartureSelector = form.querySelector('#timeout');
//const formCheckEntryOptions = form.querySelectorAll('#timein option');
//const formCheckDepartureOptions = form.querySelectorAll('#timeout option');
//const formFieldSets = form.querySelectorAll('fieldset');
const formAddress = form.querySelector('#address');
//const roomsNumberSelect = document.querySelector('#room_number');
//const guestsNumberSelect = document.querySelector('#capacity');


let minPrice = 1000;
let estateObjectType = 'Квартира';

formAddress.readOnly = true; // делаем поле адреса только для чтения

export const validateTitleLength = () => { // функция валидации длины заголовка при его введении
  const valueLength = formTitleInput.value.length;

  if (valueLength < TITLE_MIN_LENGTH) {
    formTitleInput.setCustomValidity('Добавьте ' + (TITLE_MIN_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > TITLE_MAX_LENGTH) {
    formTitleInput.setCustomValidity('Удалите ' + (valueLength - TITLE_MAX_LENGTH) + ' симв.');
  } else {
    formTitleInput.setCustomValidity('');
  }

  formTitleInput.reportValidity();
};

export const checkTitleExistence = () => { // функция валидации наличия заголовка
  if (formTitleInput.validity.valueMissing) {
    formTitleInput.setCustomValidity('Без заголовка объявление не публикуется');
  }
}

export const checkPriceValidity = () => { // функция валидации величины цены
  const price = formPriceInput.value;
  if (price > MAX_PRICE) {
    formPriceInput.setCustomValidity('Больше миллиона цена быть не может');
  } else if (price < minPrice) {
    formPriceInput.setCustomValidity(`Меньше ${minPrice} цены на объект "${estateObjectType}" быть не может`);
  } else {
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
};

export const changeValidPriceRange = (evt) => { // изменение минимальной цены при изменении типа жилья
  switch (evt.target.value) {
    case 'bungalow':
      minPrice = 0;
      estateObjectType = 'Бунгало';
      break;
    case 'flat':
      minPrice = 1000;
      estateObjectType = 'Квартира';
      break;
    case 'house':
      minPrice = 5000;
      estateObjectType = 'Дом';
      break;
    case 'palace':
      minPrice = 10000;
      estateObjectType = 'Дворец';
      break;
  }
  formPriceInput.placeholder = minPrice;
  checkPriceValidity(minPrice, estateObjectType); // валидация величины цены
};

export const checkPriceExistence = () => {  // валидация наличия цены
  if (formPriceInput.validity.valueMissing) {
    formPriceInput.setCustomValidity('Без указания цены объявление не публикуется');
  }
};


export const makeSelectorsDependent = (firstSelector, secondSelector) => { // синхронизация двух селекторов
  secondSelector.value = firstSelector.value;
};


export const getConformity = (roomsNumber, guestsNumber) => {
  if (roomsNumber.value === '100' && guestsNumber.value !== '0') {
    guestsNumber.setCustomValidity('Выбранное помещение не предназначено для проживания гостей');
  } else if (roomsNumber.value !== '100' && guestsNumber.value === '0') {
    guestsNumber.setCustomValidity('Варианту "не для гостей" соответствует только помещение в 100 комнат');
  } else if (roomsNumber.value < guestsNumber.value) {
    guestsNumber.setCustomValidity('Количество гостей не может быть больше количества мест');
  } else {
    guestsNumber.setCustomValidity('');
  }
  guestsNumber.reportValidity();
};

makeSelectorsDependent(formCheckEntrySelector, formCheckDepartureSelector); // синхронизация времён въезда и выезда
