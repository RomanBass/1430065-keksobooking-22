const getRandomInteger = (min, max) => {
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

const getRandomFloat = (min, max, precision) => {
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

const reduceAndRandomizeArray = (array) => {
  let tinyArray = [];
  const tinyArrayLength = getRandomInteger(0, array.length);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  for (let k = 0; k < tinyArrayLength; k++) {
    tinyArray[k] = array[k];
  }
  return tinyArray;
};

const showErrorMessage = (message) => {
  const node = document.createElement('div');
  node.style = 'border: 5px solid red; z-index: 100; margin: 0 auto; text-align: center; background-color: yellow; color: red; padding: 0;';
  node.style.position = 'fixed';
  node.style.left = 0;
  node.style.right = 0;
  node.style.zIndex = 3;
  node.style.top = '595px';
  node.style.width = '1200px';
  node.style.fontSize = '50px';
  node.textContent = message;
  document.body.insertAdjacentElement('afterbegin', node);
};

export {getRandomInteger, getRandomFloat, reduceAndRandomizeArray, showErrorMessage};
