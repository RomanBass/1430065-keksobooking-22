import {titleInput, priceInput} from './form.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MAX_PRICE = 1000000;

let minPrice = 1000;
let estateObjectType = 'Квартира';

export const titleLengthHandler = () => { // функция валидации длины заголовка при его введении
  const valueLength = titleInput.value.length;

  if (valueLength < TITLE_MIN_LENGTH) {
    titleInput.setCustomValidity('Добавьте ' + (TITLE_MIN_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > TITLE_MAX_LENGTH) {
    titleInput.setCustomValidity('Удалите ' + (valueLength - TITLE_MAX_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
};

export const titleExistenceHandler = () => { // функция валидации наличия заголовка
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Без заголовка объявление не публикуется');
  }
}

export const priceValidityHandler = () => { // функция валидации величины цены
  const price = priceInput.value;
  if (price > MAX_PRICE) {
    priceInput.setCustomValidity('Больше миллиона цена быть не может');
  } else if (price < minPrice) {
    priceInput.setCustomValidity(`Меньше ${minPrice} цены на объект "${estateObjectType}" быть не может`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
};

export const priceRangeHandler = (evt) => { // изменение минимальной цены при изменении типа жилья
  const FormEstateObjectTypeValue = {
    BUNGALOW: 'bungalow',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace',
  }

  const FormEstateObjectTypeText = {
    BUNGALOW: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  }

  const MinPrice = {
    BUNGALOW: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  }

  switch (evt.target.value) {
    case FormEstateObjectTypeValue.BUNGALOW:
      minPrice = MinPrice.BUNGALOW;
      estateObjectType = FormEstateObjectTypeText.BUNGALOW;
      break;
    case FormEstateObjectTypeValue.FLAT:
      minPrice = MinPrice.FLAT;
      estateObjectType = FormEstateObjectTypeText.FLAT;
      break;
    case FormEstateObjectTypeValue.HOUSE:
      minPrice = MinPrice.HOUSE;
      estateObjectType = FormEstateObjectTypeText.HOUSE;
      break;
    case FormEstateObjectTypeValue.PALACE:
      minPrice = MinPrice.PALACE;
      estateObjectType = FormEstateObjectTypeText.PALACE;
      break;
  }
  priceInput.placeholder = minPrice;
  priceValidityHandler(minPrice, estateObjectType); // валидация величины цены
};

export const priceExistenceHandler = () => {  // валидация наличия цены
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Без указания цены объявление не публикуется');
  }
};

export const selectorsSynchronizationHandler = (firstSelector, secondSelector) => { // синхронизация двух селекторов
  secondSelector.value = firstSelector.value;
};

export const roomsAndGuestsHandler = (roomsNumber, guestsNumber) => {
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
