import {switchFiltersActivation} from './filter.js';
import {switchFormActivation} from './form.js';

// const form = document.querySelector('.ad-form');
// const formFieldSets = form.querySelectorAll('fieldset');

// const switchFormActivation = (deactivator) => {
//   if (deactivator) {
//     form.classList.add('ad-form--disabled');
//     filterForm.classList.add('map__filters--disabled');
//   } else {
//     form.classList.remove('ad-form--disabled');
//     filterForm.classList.remove('map__filters--disabled');
//   }

//   formFieldSets.forEach((fieldSet) => { // все поля формы делаются неактивными deactivator = true
//     fieldSet.disabled = deactivator;
//   });
// }

const switchPageActivation = (deactivator) => { // функция активации и деактивации страницы, при deactivator = true деактивирует, при deactivator = false активирует
  switchFormActivation (deactivator);
  switchFiltersActivation(deactivator);
};

switchPageActivation(true);
export {switchPageActivation};

// if (deactivator) {
//   filterForm.classList.add('map__filters--disabled');
// } else {
//   filterForm.classList.remove('map__filters--disabled');
// }
