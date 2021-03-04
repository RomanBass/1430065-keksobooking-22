import './util.js';
import './card.js';
import {setFormSubmitHandler, form, formResetButton, fillFormAddress} from  './form.js';
import './page-activation.js';
import './filter.js';
import {resetMainPinPosition, TokyoCenterView} from './map.js';
import './server.js';

setFormSubmitHandler(resetMainPinPosition);

formResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  resetMainPinPosition();
  fillFormAddress(TokyoCenterView.LATITUDE, TokyoCenterView.LONGITUDE);
});
