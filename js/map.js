/* global L:readonly */
import {switchPageActivation} from './page-activation.js';
import {showErrorMessage} from './util.js';
import {renderCard} from './card.js';
import {getData} from './server.js';
import {fillFormAddress} from './form.js';

const ESTATE_OBJECTS_NUMBER = 10;
const TokyoCenterView = { // координаты центра Токио и начальный масштаб карты
  LATITUDE: 35.65858,
  LONGITUDE: 139.74544,
  ZOOM: 9,
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

export const resetMainPinPosition = () => {
  mainPinMarker.setLatLng({
    lat: TokyoCenterView.LATITUDE,
    lng: TokyoCenterView.LONGITUDE,
  });
  map.setView({
    lat: TokyoCenterView.LATITUDE,
    lng: TokyoCenterView.LONGITUDE,
  }, TokyoCenterView.ZOOM);
};

mainPinMarker.addTo(map); // отрисовка главной метки

fillFormAddress(TokyoCenterView.LATITUDE, TokyoCenterView.LONGITUDE);

mainPinMarker.on('move', (evt) => { // передача координат главной метки в поле адреса после перемещения
  const MainMarkerCoordinates = {
    LATITUDE: evt.target.getLatLng().lat,
    LONGITUDE: evt.target.getLatLng().lng,
    SIGNS_NUMBER: 5,
  }
  const formAddressLatitude = Math.round(MainMarkerCoordinates.LATITUDE * 10 ** MainMarkerCoordinates.SIGNS_NUMBER) / 10 ** MainMarkerCoordinates.SIGNS_NUMBER;
  const formAddressLongitude = Math.round(MainMarkerCoordinates.LONGITUDE * 10 ** MainMarkerCoordinates.SIGNS_NUMBER) / 10 ** MainMarkerCoordinates.SIGNS_NUMBER;
  fillFormAddress(formAddressLatitude, formAddressLongitude);
});

const PinIcon = L.icon({ // создание иконок для меток, кроме главной
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderPins = (estateObjects) => { // отрисовка меток, кроме главной
  const cyclesNumber = estateObjects.length <= ESTATE_OBJECTS_NUMBER ? estateObjects.length : ESTATE_OBJECTS_NUMBER; // считается количество итераций, на случай, если с сервера придёт данных меньше, чем количество показываемых объектов
  for(let i = 0; i < cyclesNumber; i++) {

    const PinMarker = L.marker(
      {
        lat: estateObjects[i].location.lat,
        lng: estateObjects[i].location.lng,
      },
      {
        icon: PinIcon,
      },
    );

    PinMarker
      .addTo(map)
      .bindPopup( // вызов попапа карточки объекта
        renderCard(estateObjects[i]),
      );
  }
}

getData(renderPins, showErrorMessage); // отрисовка пинов по данным с сервера или сообщения об ошибке
