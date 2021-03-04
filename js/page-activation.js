import {switchFiltersActivation} from './filter.js';
import {switchFormActivation} from './form.js';

const switchPageActivation = (deactivator) => { // функция активации и деактивации страницы, при deactivator = true деактивирует, при deactivator = false активирует
  switchFormActivation (deactivator);
  switchFiltersActivation(deactivator);
};

switchPageActivation(true);
export {switchPageActivation};
