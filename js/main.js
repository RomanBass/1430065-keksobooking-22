import './util.js';
import './card.js';
import {setFormSubmitHandler} from  './form.js';
import './page-activation.js';
import './filter.js';
import {resetMainPinPosition} from './map.js';
import './server.js';

setFormSubmitHandler(resetMainPinPosition);
