import {form, formFieldSets} from './form-validation.js';
import {filterForm, filters} from './filter.js';

const switchPageActivation = (deactivate) => { // функция активации и деактивации страницы, при deactivate = true деактивирует, при deactivate = false активирует
  if (deactivate) {
    form.classList.add('ad-form--disabled');
    filterForm.classList.add('map__filters--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
    filterForm.classList.remove('map__filters--disabled');
  }

  formFieldSets.forEach((fieldSet) => { // все поля формы делаются неактивными
    fieldSet.disabled = deactivate;
  });

  filters.forEach((filter) => { // все фильтры делаются неактивными
    filter.disabled = deactivate;
  });
};

switchPageActivation(true);
export {switchPageActivation};
