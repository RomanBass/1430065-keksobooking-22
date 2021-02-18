/* global L:readonly */
import {switchPageActivation} from './page-activation.js';
const TokioCenterView = {
  LATITUDE: 35.65858,
  LONGITUDE: 139.74544,
  ZOOM: 10,
}
const map = L.map('map-canvas')
  .on('load', () => {
    switchPageActivation(false) // делаем страницу активной
  })
  .setView({
    lat: TokioCenterView.LATITUDE,
    lng: TokioCenterView.LONGITUDE,
  }, TokioCenterView.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
