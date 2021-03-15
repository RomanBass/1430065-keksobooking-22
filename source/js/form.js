import {validateTitleLength, checkTitleExistence, checkPriceValidity, changeValidPriceRange, checkPriceExistence,
  makeSelectorsDependent, getConformity} from './form-validation.js';
import {sendData} from './server.js';
import {TokyoCenterView} from './util.js';

const form = document.querySelector('.ad-form');
const formTitleInput = document.querySelector('#title');
const formHousingTypeSelector = form.querySelector('#type');
const formPriceInput = form.querySelector('#price');
const formCheckEntrySelector = form.querySelector('#timein');
const formCheckDepartureSelector = form.querySelector('#timeout');
const formAddress = form.querySelector('#address');
const roomsNumberSelect = document.querySelector('#room_number');
const guestsNumberSelect = document.querySelector('#capacity');
const formSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const formSuccessNotice = formSuccessTemplate.cloneNode(true);
const formErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const formErrorNotice = formErrorTemplate.cloneNode(true);
const formResetButton = form.querySelector('.ad-form__reset');
const formFieldSets = form.querySelectorAll('fieldset');
const main = document.querySelector('main');

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

export const setFormSubmitHandler = (callback) => {
  const throwFormSuccessNotice = () => { // вывод сообщения об успешной отправке формы
    main.appendChild(formSuccessNotice);

    document.addEventListener('click', () => {
      if (main.contains(formSuccessNotice)) {
        main.removeChild(formSuccessNotice);
        form.reset();
        callback();
      }
    });

    document.addEventListener('keydown', function (evtKeydown) { // закрытие сообщения по нажатию esc
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
    sendData(throwFormSuccessNotice, throwFormErrorNotice, formData); // отправка данных формы на сервер
  });
};

export const setFormResetHandler = (callback) => {
  formResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    form.reset();
    callback();
    fillFormAddress(TokyoCenterView.LATITUDE, TokyoCenterView.LONGITUDE);
  });
}

const throwFormErrorNotice = (errorMessage) => { // вывод сообщения об ошибке при формы

  const formErrorNoticeText = document.querySelector('.error__message'); // извлекаем параграф с сообщением

  main.appendChild(formErrorNotice); // добавление в блок main сообщения об ошибке
  formErrorNoticeText.textContent = errorMessage; // корректируем сообщение

  document.addEventListener('click', () => {
    if (main.contains(formErrorNotice)) {
      main.removeChild(formErrorNotice);
    }
  });

  document.addEventListener('keydown', function (evtKeydown) { // закрытие сообщения по нажатию esc
    if (evtKeydown.key === 'Escape' && main.contains(formErrorNotice)) { // блокировка, чтобы не выдавалась ошибка об отсутствии дочернего элемента
      main.removeChild(formErrorNotice);
    }
  });
};

export const fillFormAddress = (latitude, longitude) => {
  formAddress.value = `${latitude}, ${longitude}`; // передача начальных координат главной метки в поле адреса
};

export const switchFormActivation = (deactivator) => {
  if (deactivator) {
    form.classList.add('ad-form--disabled');

  } else {
    form.classList.remove('ad-form--disabled');
  }

  formFieldSets.forEach((fieldSet) => { // все поля формы делаются неактивными deactivator = true
    fieldSet.disabled = deactivator;
  });
};

formAddress.readOnly = true; // делаем поле адреса только для чтения
makeSelectorsDependent(formCheckEntrySelector, formCheckDepartureSelector); // синхронизация времён въезда и выезда

export {form, formTitleInput, formHousingTypeSelector, formPriceInput, formResetButton};
