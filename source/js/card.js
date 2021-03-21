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
  const descriptionSection = newCard.querySelector('.popup__description');
  const descriptionText = estateObject.offer.description;

  newCard.querySelector('img').src = estateObject.author.avatar;
  newCard.querySelector('.popup__title').textContent = estateObject.offer.title;
  newCard.querySelector('.popup__text--address').textContent = estateObject.offer.address;
  newCard.querySelector('.popup__text--price').textContent = `${estateObject.offer.price}₽/ночь`;
  newCard.querySelector('.popup__text--capacity').textContent = `${estateObject.offer.rooms} комнаты для ${estateObject.offer.guests} гостей`;
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${estateObject.offer.checkin}, выезд до ${estateObject.offer.checkout}`;

  if (!descriptionText) {
    descriptionSection.remove();
  } else {
    descriptionSection.textContent = descriptionText;
  }

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

  if (!featuresList.length) {
    possibleFeaturesList.remove();
  } else {
    possibleFeaturesList.innerHTML = '';
    featuresList.forEach((element => {
      const feature = `<li class="popup__feature popup__feature--${element}"></li>`;
      possibleFeaturesList.insertAdjacentHTML('beforeend', feature);
    }))
  }

  if (!photosList.length) {
    photoGallery.remove();
  } else {
    photoGallery.innerHTML = '';
    photosList.forEach(element => {
      const photo = `<img src="${element}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
      photoGallery.insertAdjacentHTML('beforeend', photo);
    })
  }

  return newCard;
};

export {renderCard};
