const filterForm = document.querySelector('.map__filters');
const filters = filterForm.querySelectorAll('select, fieldset');

const switchFiltersActivation = (deactivator) => { // деактивируется форма фильтров deactivator = true
  if (deactivator) {
    filterForm.classList.add('map__filters--disabled');
  } else {
    filterForm.classList.remove('map__filters--disabled');
  }

  filters.forEach((filter) => { // деактивируются все фильтры при deactivator = true
    filter.disabled = deactivator;
  });
}

const checkHousingType = (estateObject) => { // проверка совпадения estateObject-та с выбранным типом жилья
  const housingType = document.querySelector('#housing-type option:checked').value; // текущий параметр типа жилья
  if (housingType === estateObject.offer.type || housingType === 'any') {
    return true;
  } else {
    return false;
  }
};

const checkPriceRange = (estateObject) => { // проверка попадания estateObject-та в выбранный диапазон цен
  const housingPrice = document.querySelector('#housing-price option:checked').value; // текущий параметр диапазона цен из селектора
  let indicator = false;
  switch (housingPrice) {
    case 'any':
      indicator = true;
      break;
    case 'low':
      indicator = (estateObject.offer.price <= 10000);
      break;
    case 'middle':
      indicator = (estateObject.offer.price > 10000 && estateObject.offer.price < 50000);
      break;
    case 'high':
      indicator = (estateObject.offer.price >= 50000);
  }
  return indicator;
};

const checkHousingRooms = (estateObject) => { // проверка в estateObject-те выбранного количества комнат
  const housingRooms = document.querySelector('#housing-rooms option:checked').value; // текущий параметр количества комнат
  if (estateObject.offer.rooms === parseInt(housingRooms, 10) || housingRooms === 'any') {
    return true;
  } else {
    return false;
  }
};

const checkHousingGuests = (estateObject) => { // проверка в estateObject-те выбранного количества гостей
  const housingGuests = document.querySelector('#housing-guests option:checked').value; // текущий параметр количества гостей
  if (estateObject.offer.guests === parseInt(housingGuests, 10) || housingGuests === 'any') {
    return true;
  } else {
    return false;
  }
};

const checkFacilities = (estateObject) => { // проверка наличия в estateObject-те выбранных удобств
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

const changeFiltersState = (cb, dataToFilter) => { // фильтрация данных с сервера
  filterForm.addEventListener('change', () => {
    const filteredOffers = dataToFilter.filter((estateObject) => {
      return checkHousingType(estateObject) &&
             checkPriceRange(estateObject) &&
             checkHousingRooms(estateObject) &&
             checkHousingGuests(estateObject) &&
             checkFacilities(estateObject);
    });
    cb(filteredOffers);
  });
};

export {switchFiltersActivation, changeFiltersState};
