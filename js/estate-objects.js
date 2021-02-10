import {getRandomInteger, getRandomFloat, reduceAndRandomizeArray} from './util.js';

const ESTATE_OBJECTS_NUMBER = 10;
const AUTHORS_MAX_NUMBER = 8;
const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Уютное место, рядом вокзал', 'Тихое место, рядом казино.', 'Соседи повышенного уровня культуры, рядом прачечная.', 'Для постояльцев с IQ не выше 90.'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'https://i2.wp.com/www.sonmezrealestate.com/wp-content/uploads/2018/05/080-1.jpg?fit=1688%2C1125&ssl=1', 'https://elets-adm.ru/assets/images/resources/4281/c50acc2e5c569e61107070cc7fdb5ac0ae840194.jpg'];

const TITLES = ['Замок с приведениями.', 'В тесноте, но не в обиде.', 'Царские покои.', 'Хрущёвка ХХI века.'];
const LocationRange = {
  X_MIN: 35.65000,
  X_MAX: 35.70000,
  Y_MIN: 139.70000,
  Y_MAX: 139.80000,
  SIGNS_NUMBER: 5,
};
const PriceRange = {
  MIN: 1000,
  MAX: 10000,
  PRECISION: 100,
};
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const RoomsNumberRange = {
  MIN: 0,
  MAX: 30,
};
const GuestsNumberRange = {
  MIN: 1,
  MAX: 100,
}

const createEstateObject = () => {
  const locationX = getRandomFloat(LocationRange.X_MIN, LocationRange.X_MAX, LocationRange.SIGNS_NUMBER);
  const locationY = getRandomFloat(LocationRange.Y_MIN, LocationRange.Y_MAX, LocationRange.SIGNS_NUMBER);
  const checkInOut = CHECK_IN_OUT[getRandomInteger(0, CHECK_IN_OUT.length - 1)];

  return {
    author: {
      avatar:`img/avatars/user0${getRandomInteger(1, AUTHORS_MAX_NUMBER)}.png`,
    },
    offer: {
      title: TITLES[getRandomInteger(0, TITLES.length - 1)],
      address: `${locationX}, ${locationY}`,
      price: getRandomFloat(PriceRange.MIN, PriceRange.MAX, - Math.log10(PriceRange.PRECISION)),
      type: TYPES[getRandomInteger(0, TYPES.length - 1)],
      rooms: getRandomInteger(RoomsNumberRange.MIN, RoomsNumberRange.MAX),
      guests: getRandomInteger(GuestsNumberRange.MIN, GuestsNumberRange.MAX),
      checkin: checkInOut,
      checkout: checkInOut,
      features: reduceAndRandomizeArray(FEATURES),
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      photos: reduceAndRandomizeArray(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
};

const estateObjects = new Array(ESTATE_OBJECTS_NUMBER).fill(null).map(() => createEstateObject());

estateObjects;
//console.log(estateObjects);
