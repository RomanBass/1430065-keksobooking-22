import {showErrorMessage} from './util.js';
import './card.js';
import {setFormSubmitHandler, setFormResetHandler} from  './form.js';
import './page-activation.js';
import {changeFiltersState} from './filter.js';
import {resetMainPinPosition, renderPins} from './map.js';
import {getData} from './server.js';

setFormSubmitHandler(resetMainPinPosition);
setFormResetHandler(resetMainPinPosition);
getData(                                     // отрисовка меток по данным с сервера или сообщения об ошибке
  (data) => {
    renderPins(data);                       // отрисовка меток по данным с сервера
    changeFiltersState(renderPins, data);   // отрисовка меток при применении фильтров
  },
  showErrorMessage,                         // отрисовка сообщения об ошибке
);
