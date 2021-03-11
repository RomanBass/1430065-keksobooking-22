/* global _:readonly */
import {showErrorMessage} from './util.js';
import './card.js';
import {setFormSubmitHandler, setFormResetHandler} from  './form.js';
import './page-activation.js';
import {changeFiltersState} from './filter.js';
import {resetMainPinPosition, renderPins} from './map.js';
import {getData} from './server.js';

const FILTER_SWITCH_DELAY = 500; // задержка для дебаунса фильтров

setFormSubmitHandler(resetMainPinPosition);
setFormResetHandler(resetMainPinPosition);
getData(                                     // отрисовка меток по данным с сервера или сообщения об ошибке
  (data) => {
    renderPins(data);                       // отрисовка меток по данным с сервера
    changeFiltersState(_.debounce(renderPins, FILTER_SWITCH_DELAY), data);   // отрисовка меток при применении фильтров с задержкой debounce
  },
  showErrorMessage,                         // отрисовка сообщения об ошибке
);
