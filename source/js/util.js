const TokyoCenterView = { // координаты центра Токио и начальный масштаб карты
  LATITUDE: 35.65858,
  LONGITUDE: 139.74544,
  ZOOM: 9,
}

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

export {showErrorMessage, TokyoCenterView};
