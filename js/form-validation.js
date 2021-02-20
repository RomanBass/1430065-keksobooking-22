const MAX_PRICE = 1000000;
const form = document.querySelector('.ad-form');
const formHousingTypeSelector = form.querySelector('#type');
const formPriceInput = form.querySelector('#price');
const formCheckEntrySelector = form.querySelector('#timein');
const formCheckDepartureSelector = form.querySelector('#timeout');
const formCheckEntryOptions = form.querySelectorAll('#timein option');
const formCheckDepartureOptions = form.querySelectorAll('#timeout option');
const formFieldSets = form.querySelectorAll('fieldset');
const formAddress = form.querySelector('#address');

let minPrice = 1000;
let estateObjectType = 'Квартира';

formAddress.readOnly = true; // делаем поле адреса только для чтения

const checkPriceValidity = (minPriceValue, estateObjectTypeValue) => { // функция валидации величины цены
  const price = formPriceInput.value;
  if (price > MAX_PRICE) {
    formPriceInput.setCustomValidity('Больше миллиона цена быть не может');
  } else if (price < minPrice) {
    formPriceInput.setCustomValidity(`Меньше ${minPriceValue} цены на объект "${estateObjectTypeValue}" быть не может`);
  } else {
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
};

formHousingTypeSelector.addEventListener('change', (evt) => { // изменение минимальной цены при изменении типа жилья
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
});

formPriceInput.addEventListener('input', () => {
  checkPriceValidity(minPrice, estateObjectType); // валидация величины цены
});

formPriceInput.addEventListener('invalid', () => {  // валидация наличия цены
  if (formPriceInput.validity.valueMissing) {
    formPriceInput.setCustomValidity('Без указания цены объявление не публикуется');
  }
});

const makeSelectorsDependent = (firstSelector, secondSelectorOptions) => { // синхронизация двух селекторов
  firstSelector.addEventListener('change', (evt) => {
    for (let i = 0; i < secondSelectorOptions.length; i++) {
      if (secondSelectorOptions[i].value === evt.target.value) {
        secondSelectorOptions[i].selected = true;
      }
    }
  });
};

makeSelectorsDependent(formCheckEntrySelector, formCheckDepartureOptions); // синхронизация времён въезда и выезда
makeSelectorsDependent(formCheckDepartureSelector, formCheckEntryOptions); // синхронизация времён выезда и въезда

export {form, formFieldSets, formAddress};
