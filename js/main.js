import {showErrorMessage} from './util.js';
import './card.js';
import {setFormSubmitHandler, setFormResetHandler} from  './form.js';
import './page-activation.js';
import {filterForm} from './filter.js';
import {resetMainPinPosition, renderPins} from './map.js';
import {getData} from './server.js';

setFormSubmitHandler(resetMainPinPosition);
setFormResetHandler(resetMainPinPosition);
getData(renderPins, showErrorMessage); // отрисовка пинов по данным с сервера или сообщения об ошибке

filterForm.addEventListener('change', () => {
  const markerPane = document.querySelector('.leaflet-marker-pane'); // див с метками
  const markers = markerPane.querySelectorAll('.leaflet-marker-icon:not(.leaflet-marker-draggable)'); // все метки, кроме главной
  markers.forEach(marker => markerPane.removeChild(marker)); // удаление текущих меток, кроме главной
});
