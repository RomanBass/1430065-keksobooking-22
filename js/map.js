/* global L:readonly */
import {switchPageActivation} from './page-activation.js';
import {formAddress} from './form-validation.js';
import {estateObjects} from './estate-objects.js';
import {renderCard} from './card.js'

const TokyoCenterView = { // координаты центра Токио и начальный масштаб карты
  LATITUDE: 35.65858,
  LONGITUDE: 139.74544,
  ZOOM: 12,
}

const map = L.map('map-canvas')
  .on('load', () => {
    switchPageActivation(false) // делаем страницу активной
  })
  .setView({
    lat: TokyoCenterView.LATITUDE,
    lng: TokyoCenterView.LONGITUDE,
  }, TokyoCenterView.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({ // создание иконки для главной метки
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TokyoCenterView.LATITUDE,
    lng: TokyoCenterView.LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map); // отрисовка главной метки

formAddress.value = `${TokyoCenterView.LATITUDE}, ${TokyoCenterView.LONGITUDE}`; // передача начальных координат главной метки в поле адреса

mainPinMarker.on('move', (evt) => { // передача координат главной метки в поле адреса после перемещения
  const MainMarkerCoordinates = {
    LATITUDE: evt.target.getLatLng().lat,
    LONGITUDE: evt.target.getLatLng().lng,
    SIGNS_NUMBER: 5,
  }
  const formAddressLatitude = Math.round(MainMarkerCoordinates.LATITUDE * 10 ** MainMarkerCoordinates.SIGNS_NUMBER) / 10 ** MainMarkerCoordinates.SIGNS_NUMBER;
  const formAddressLongitude = Math.round(MainMarkerCoordinates.LONGITUDE * 10 ** MainMarkerCoordinates.SIGNS_NUMBER) / 10 ** MainMarkerCoordinates.SIGNS_NUMBER;
  formAddress.value = `${formAddressLatitude}, ${formAddressLongitude}`;
});

const PinIcon = L.icon({ // создание иконок для меток, кроме главной
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

estateObjects.forEach((estateObject) => { // отрисовка меток, кроме главной
  const PinMarker = L.marker(
    {
      lat: estateObject.location.x,
      lng: estateObject.location.y,
    },
    {
      icon: PinIcon,
    },
  );

  PinMarker
    .addTo(map)
    .bindPopup( // вызов попапа карточки объекта
      renderCard(estateObject),
    );
});

//export {TokyoCenterView};
