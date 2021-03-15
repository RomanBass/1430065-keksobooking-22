const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderCard = (estateObject) => {

  const newCard = cardTemplate.cloneNode(true);
  const possibleFeaturesList = newCard.querySelector('.popup__features');
  const featuresList = estateObject.offer.features;
  const photoGallery = newCard.querySelector('.popup__photos');
  const photosList = estateObject.offer.photos;

  newCard.querySelector('img').src = estateObject.author.avatar;
  newCard.querySelector('.popup__title').textContent = estateObject.offer.title;
  newCard.querySelector('.popup__text--address').innerHTML = estateObject.offer.address;
  newCard.querySelector('.popup__text--price').innerHTML = `${estateObject.offer.price}&#x20bd/ночь`;
  newCard.querySelector('.popup__text--capacity').textContent = `${estateObject.offer.rooms} комнаты для ${estateObject.offer.guests} гостей`;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${estateObject.offer.checkin}, выезд до ${estateObject.offer.checkout}`;
  newCard.querySelector('.popup__description').textContent = estateObject.offer.description;

  switch (estateObject.offer.type) {
    case 'bungalow':
      newCard.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'flat':
      newCard.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      newCard.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      newCard.querySelector('.popup__type').textContent = 'Дворец';
      break;
  }

  possibleFeaturesList.innerHTML = '';
  for (let i = 0; i < featuresList.length; i++) {
    const element = `<li class="popup__feature popup__feature--${featuresList[i]}"></li>`;
    possibleFeaturesList.insertAdjacentHTML('beforeend', element);
  }

  photoGallery.innerHTML = '';
  for (let i = 0; i < photosList.length; i++) {
    const element = `<img src="${photosList[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
    photoGallery.insertAdjacentHTML('beforeend', element);
  }

  return newCard;
};

export {renderCard}
