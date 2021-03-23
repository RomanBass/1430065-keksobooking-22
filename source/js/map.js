/* global L:readonly */
import {deactivatePage} from './page-activation.js';
import {TokyoCenterView} from './util.js';
import {renderCard} from './card.js';
import {setAddress} from './form.js';

const ESTATE_OBJECTS_NUMBER = 10;
const ARRAY_INITIAL_ELEMENT_INDEX = 0;

const map = L.map('map-canvas')
  .on('load', () => {
    deactivatePage(false) // делаем страницу активной
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

setAddress(TokyoCenterView.LATITUDE, TokyoCenterView.LONGITUDE);

mainPinMarker.on('move', (evt) => { // передача координат главной метки в поле адреса после перемещения
  const MainMarkerCoordinates = {
    LATITUDE: evt.target.getLatLng().lat,
    LONGITUDE: evt.target.getLatLng().lng,
    SIGNS_NUMBER: 5,
  }
  const formAddressLatitude = Math.round(MainMarkerCoordinates.LATITUDE * 10 ** MainMarkerCoordinates.SIGNS_NUMBER) / 10 ** MainMarkerCoordinates.SIGNS_NUMBER;
  const formAddressLongitude = Math.round(MainMarkerCoordinates.LONGITUDE * 10 ** MainMarkerCoordinates.SIGNS_NUMBER) / 10 ** MainMarkerCoordinates.SIGNS_NUMBER;
  setAddress(formAddressLatitude, formAddressLongitude);
});

const PinIcon = L.icon({ // создание иконок для меток, кроме главной
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pinsLayerGroup = L.layerGroup() // создаём группу слоёв, куда будут добавляться все маркеры, кроме основного
  .addTo(map);                      // добавляем группу слоёв на карту

const renderPins = (estateObjects) => { // отрисовка меток, кроме главной

  if (pinsLayerGroup.getLayers().length) { // если группа слоев содержит не пустой массив, то...
    pinsLayerGroup.clearLayers(); // затираются все ранее созданные метки
  }

  estateObjects.slice(ARRAY_INITIAL_ELEMENT_INDEX, ESTATE_OBJECTS_NUMBER).forEach((element) => {
    const PinMarker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: PinIcon,
      },
    );

    PinMarker
      .bindPopup(    // вызов попапа карточки объекта
        renderCard(element),
      );

    pinsLayerGroup
      .addLayer(PinMarker);
  })
}

export {TokyoCenterView, renderPins, map};
