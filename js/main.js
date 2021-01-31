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
