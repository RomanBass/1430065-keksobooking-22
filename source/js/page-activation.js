import {deactivateFilters} from './filter.js';
import {deactivateForm} from './form.js';

const deactivatePage = (deactivator) => { // функция активации и деактивации страницы, при deactivator = true деактивирует, при deactivator = false активирует
  deactivateForm (deactivator);
  deactivateFilters(deactivator);
};

deactivatePage(true);
export {deactivatePage};
