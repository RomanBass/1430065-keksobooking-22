const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderCard = (estateObject) => {

  const ServerEstateObjectTypeValue = {
    BUNGALOW: 'bungalow',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace',
  }

  const CardEstateObjectTypeText = {
    BUNGALOW: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  }

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
    case ServerEstateObjectTypeValue.BUNGALOW:
      newCard.querySelector('.popup__type').textContent = CardEstateObjectTypeText.BUNGALOW;
      break;
    case ServerEstateObjectTypeValue.FLAT:
      newCard.querySelector('.popup__type').textContent = CardEstateObjectTypeText.FLAT;
      break;
    case ServerEstateObjectTypeValue.HOUSE:
      newCard.querySelector('.popup__type').textContent = CardEstateObjectTypeText.HOUSE;
      break;
    case ServerEstateObjectTypeValue.PALACE:
      newCard.querySelector('.popup__type').textContent = CardEstateObjectTypeText.PALACE;
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
