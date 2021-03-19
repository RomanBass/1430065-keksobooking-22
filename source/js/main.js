/* global _:readonly */
import {showErrorMessage} from './util.js';
import './card.js';
import {handleFormSubmission, setFormResetHandler} from  './form.js';
import './page-activation.js';
import {filterEstateObjects} from './filter.js';
import {resetMainPinPosition, renderPins} from './map.js';
import {getData} from './server.js';
import './photo.js';

const FILTER_SWITCH_DELAY = 500; // задержка для дебаунса фильтров

handleFormSubmission(resetMainPinPosition);
setFormResetHandler(resetMainPinPosition);
getData(                                     // отрисовка меток по данным с сервера или сообщения об ошибке
  (data) => {
    renderPins(data);                       // отрисовка меток по данным с сервера
    filterEstateObjects(_.debounce(renderPins, FILTER_SWITCH_DELAY), data);   // отрисовка меток при применении фильтров с задержкой debounce
  },
  showErrorMessage,                         // отрисовка сообщения об ошибке
);
