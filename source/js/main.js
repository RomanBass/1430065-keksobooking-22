/* global _:readonly */
import {showErrorMessage} from './util.js';
import './card.js';
import {formSubmitHandler, formResetHandler} from  './form.js';
import './page-activation.js';
import {filtersStateHandler} from './filter.js';
import {resetMainPinPosition, renderPins} from './map.js';
import {getData} from './server.js';
import './photo.js';

const FILTER_SWITCH_DELAY = 500; // задержка для дебаунса фильтров

formSubmitHandler(resetMainPinPosition);
formResetHandler(resetMainPinPosition);
getData(                                     // отрисовка меток по данным с сервера или сообщения об ошибке
  (data) => {
    renderPins(data);                       // отрисовка меток по данным с сервера
    filtersStateHandler(_.debounce(renderPins, FILTER_SWITCH_DELAY), data);   // отрисовка меток при применении фильтров с задержкой debounce
  },
  showErrorMessage,                         // отрисовка сообщения об ошибке
);
