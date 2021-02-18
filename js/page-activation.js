import {form, formFieldSets} from './form-validation.js';
import {filterForm, filters} from './filter.js';

const switchPageActivation = (booleanParameter) => { // функция активации и деактивации страницы, при booleanParameter = true деактивирует, при boolean = false активирует
  if (booleanParameter) {
    form.classList.add('ad-form--disabled');
    filterForm.classList.add('map__filters--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
    filterForm.classList.remove('map__filters--disabled');
  }

  formFieldSets.forEach((fieldSet) => { // все поля формы делаются неактивными
    fieldSet.disabled = booleanParameter;
  });

  filters.forEach((filter) => { // все фильтры делаются неактивными
    filter.disabled = booleanParameter;
  });
};

switchPageActivation(true);
export {switchPageActivation};
