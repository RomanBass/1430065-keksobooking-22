'use strict';

const getRandomInteger = function (min, max) {
  if (min < 0 || max < 0) {
    alert('Параметры не могут быть отрицательными');
    return undefined;
  }

  if (min > max) {
    alert('Первый параметр не может быть больше второго');
    return undefined;
  }

  if (min === max) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = function (min, max, precision) {
  if (min < 0 || max < 0) {
    alert('Параметры интервала не могут быть отрицательными');
    return undefined;
  }

  if (min > max) {
    alert('Первый параметр не может быть больше второго');
    return undefined;
  }

  const minScaled = Math.round(min * 10 ** precision);
  const maxScaled = Math.round(max * 10 ** precision);

  if (min === max) {
    return minScaled / 10 ** precision;
  }

  const randomScaled = Math.floor(Math.random() * (maxScaled - minScaled + 1)) + minScaled;
  return randomScaled / 10 ** precision;
};

getRandomInteger(5, 63);
getRandomFloat(0.123, 985.12, 2);

const MAX_AUTHORS_NUMBER = 8;
const TITLES = ['Замок с приведениями.', 'В тесноте, но не в обиде.', 'Царские покои.', 'Хрущёвка ХХI века.'];
const LocationRange = {
  X_MIN: 35.65000,
  X_MAX: 35.70000,
  Y_MIN: 139.70000,
  Y_MAX: 139.80000,
  PRECISION_SIGNS_NUMBER: 5,
};
const PriceRange = {
  PRICE_MIN: 1000,
  PRICE_MAX: 10000,
  PRICE_PRECISION: 100,
}

let getEstateObject = function () {

  const locationX = getRandomFloat(LocationRange.X_MIN, LocationRange.X_MAX, LocationRange.PRECISION_SIGNS_NUMBER);
  const locationY = getRandomFloat(LocationRange.Y_MIN, LocationRange.Y_MAX, LocationRange.PRECISION_SIGNS_NUMBER);

  return {
    author: {
      avatar:`img/avatars/user0${getRandomInteger(1, MAX_AUTHORS_NUMBER)}.png`,
    },
    offer: {
      title: TITLES[getRandomInteger(0, TITLES.length - 1)],
      address: `${locationX}, ${locationY}`,
      price: getRandomFloat(PriceRange.PRICE_MIN, PriceRange.PRICE_MAX, - Math.log10(PriceRange.PRICE_PRECISION)),
      type: [],
      rooms: [],
      guests: [],
      checkin: [],
      checkout: [],
      features: [],
      description: [],
      photos: [],
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
};

console.log(getEstateObject());

// В файле main.js на основе написанных в прошлом задании утилитарных функций напишите необходимые функции для создания
// массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.

// Структура каждого объекта должна быть следующей:

// author, объект — описывает автора. Содержит одно поле:
// avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это случайное число от 1 до 8 с ведущим нулём.
// Например, 01, 02 и т. д.

// offer, объект — содержит информацию об объявлении. Состоит из полей:
// title, строка — заголовок предложения. Придумайте самостоятельно.
// address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.
// price, число — стоимость. Любое положительное число.
// type, строка — одно из четырёх фиксированных значений: palace, flat, house или bungalow.
// rooms, число — количество комнат. Любое положительное число.
// guests, число — количество гостей, которое можно разместить. Любое положительное число.
// checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
// checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
// features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
// description, строка — описание помещения. Придумайте самостоятельно.
// photos, массив строк — массив случайной длины из значений: http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel2.jpg, http://o0.github.io/assets/images/tokyo/hotel3.jpg.

// location, объект — местоположение в виде географических координат. Состоит из двух полей:
// x, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000
// y, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000

