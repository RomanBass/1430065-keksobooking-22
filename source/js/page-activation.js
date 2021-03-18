import {filtersActivationHandler} from './filter.js';
import {formActivationHandler} from './form.js';

const pageActivationHandler = (deactivator) => { // функция активации и деактивации страницы, при deactivator = true деактивирует, при deactivator = false активирует
  formActivationHandler (deactivator);
  filtersActivationHandler(deactivator);
};

pageActivationHandler(true);
export {pageActivationHandler};
