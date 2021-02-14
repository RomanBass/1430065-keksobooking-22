const MAX_PRICE = 1000000;
const form = document.querySelector('.ad-form');
const formHousingTypeSelector = form.querySelector('#type');
const formPriceInput = form.querySelector('#price');
const formCheckEntrySelector = form.querySelector('#timein');
const formCheckDepartureSelector = form.querySelector('#timeout');
const formCheckEntryOptions = form.querySelectorAll('#timein option');
const formCheckDepartureOptions = form.querySelectorAll('#timeout option');
let minPrice = 1000;

formHousingTypeSelector.addEventListener('change', (evt) => { // изменение мин цены при изменении типа жилья
  switch (evt.target.value) {
    case 'bungalow':
      minPrice = 0;
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
  }
  formPriceInput.placeholder = minPrice;
  formPriceInput.value = '';
});

formPriceInput.addEventListener('input', () => {  // валидация величины цены
  const price = formPriceInput.value;

  if (price > MAX_PRICE) {
    formPriceInput.setCustomValidity('Больше миллиона цен не бывает');
  } else if (price < minPrice) {
    formPriceInput.setCustomValidity(`Меньше ${minPrice} цены не бывает`);
  } else {
    formPriceInput.setCustomValidity('');
  }

  formPriceInput.reportValidity();
});

formPriceInput.addEventListener('invalid', function () {  // валидация введения цены
  if (formPriceInput.validity.valueMissing) {
    formPriceInput.setCustomValidity('Как же без цены?');
  }
});

const makeSelectorsDependent = (firstSelector, secondSelectorOptions) => { // синхронизация времён въезда и выезда
  firstSelector.addEventListener('change', function (evt) {
    for (let i = 0; i < secondSelectorOptions.length; i++) {
      if (secondSelectorOptions[i].value === evt.target.value) {
        secondSelectorOptions[i].selected = true;
      }
    }
  });
};

makeSelectorsDependent(formCheckEntrySelector, formCheckDepartureOptions);
makeSelectorsDependent(formCheckDepartureSelector, formCheckEntryOptions);
