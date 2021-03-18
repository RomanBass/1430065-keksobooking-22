const filterForm = document.querySelector('.map__filters');
const filters = filterForm.querySelectorAll('select, fieldset');

const filtersActivationHandler = (deactivator) => { // деактивируется форма фильтров deactivator = true
  if (deactivator) {
    filterForm.classList.add('map__filters--disabled');
  } else {
    filterForm.classList.remove('map__filters--disabled');
  }

  filters.forEach((filter) => { // деактивируются все фильтры при deactivator = true
    filter.disabled = deactivator;
  });
}

const housingTypeHandler = (estateObject) => { // проверка совпадения estateObject-та с выбранным типом жилья
  const housingType = document.querySelector('#housing-type option:checked').value; // текущий параметр типа жилья
  return housingType === estateObject.offer.type || housingType === 'any';
};

const priceRangeHandler = (estateObject) => { // проверка попадания estateObject-та в выбранный диапазон цен

  const PriceRangeName = {
    ANY: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  }

  const PriceRangeLimit = {
    LOW: 10000,
    HIGH: 50000,
  }

  const housingPrice = document.querySelector('#housing-price option:checked').value; // текущий параметр диапазона цен из селектора
  let indicator = false;
  switch (housingPrice) {
    case PriceRangeName.ANY:
      indicator = true;
      break;
    case PriceRangeName.LOW:
      indicator = (estateObject.offer.price <= PriceRangeLimit.LOW);
      break;
    case PriceRangeName.MIDDLE:
      indicator = (estateObject.offer.price > PriceRangeLimit.LOW && estateObject.offer.price < PriceRangeLimit.HIGH);
      break;
    case PriceRangeName.HIGH:
      indicator = (estateObject.offer.price >= PriceRangeLimit.HIGH);
  }
  return indicator;
};

const housingRoomsHandler = (estateObject) => { // проверка в estateObject-те выбранного количества комнат
  const housingRooms = document.querySelector('#housing-rooms option:checked').value; // текущий параметр количества комнат
  return estateObject.offer.rooms === parseInt(housingRooms, 10) || housingRooms === 'any';
};

const housingGuestsHandler = (estateObject) => { // проверка в estateObject-те выбранного количества гостей
  const housingGuests = document.querySelector('#housing-guests option:checked').value; // текущий параметр количества гостей
  return estateObject.offer.guests === parseInt(housingGuests, 10) || housingGuests === 'any';
};

const facilitiesHandler = (estateObject) => { // проверка наличия в estateObject-те выбранных удобств
  const facilitiesArray = document.querySelectorAll('#housing-features input'); // массив опций удобств
  let indicator = true;
  for (let i = 0; i < facilitiesArray.length; i++) { // цикл проходит по всем элементам массива опций удобств
    if (facilitiesArray[i].checked && !estateObject.offer.features.includes(facilitiesArray[i].value)) { // если удобство чекнуто И его нет в estateObject-те, то...
      indicator = false;
      break;
    }
  }
  return indicator;
};

const filtersStateHandler = (cb, dataToFilter) => { // фильтрация данных с сервера
  filterForm.addEventListener('change', () => {
    const filteredOffers = dataToFilter.filter((estateObject) => {
      return housingTypeHandler(estateObject) &&
             priceRangeHandler(estateObject) &&
             housingRoomsHandler(estateObject) &&
             housingGuestsHandler(estateObject) &&
             facilitiesHandler(estateObject);
    });
    cb(filteredOffers);
  });
};

export {filtersActivationHandler, filtersStateHandler};
