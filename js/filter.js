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

const changeFiltersState = (cb, dataToFilter) => { // отрисовка меток с учётом применения фильтров
  filterForm.addEventListener('change', () => {

    const housingType = document.querySelector('#housing-type option:checked').value; // текущий параметр типа жилья
    const housingPrice = document.querySelector('#housing-price option:checked').value; // текущий параметр диапазона цен из селектора
    const housingRooms = document.querySelector('#housing-rooms option:checked').value; // текущий параметр количества комнат
    const housingGuests = document.querySelector('#housing-guests option:checked').value; // текущий параметр количества гостей
    const facilitiesArray = document.querySelectorAll('#housing-features input'); // массив опций удобств

    const housingTypeFilteredOffers = dataToFilter.filter((estateObject) => { // фильтрация данных с сервера по типу жилья
      if (housingType === 'any') {
        return dataToFilter;
      } else {
        return estateObject.offer.type === housingType;
      }
    });

    const housingPriceFilteredOffers = housingTypeFilteredOffers.filter(function (estateObject) { // фильтрация данных из предыдущего фильтра по диапазону цены
      let priceRange;
      switch (housingPrice) {
        case 'any':
          priceRange = housingTypeFilteredOffers;
          break;
        case 'low':
          priceRange = (estateObject.offer.price <= 10000);
          break;
        case 'middle':
          priceRange = (estateObject.offer.price > 10000 && estateObject.offer.price < 50000);
          break;
        case 'high':
          priceRange = (estateObject.offer.price >= 50000);
      }
      return priceRange;
    });

    const housingRoomsFilteredOffers = housingPriceFilteredOffers.filter(function (estateObject) { // фильтрация данных из предыдущего фильтра по количеству комнат
      if (housingRooms === 'any') {
        return housingPriceFilteredOffers;
      } else {
        return estateObject.offer.rooms === parseInt(housingRooms, 10); // преобразуем строку в целое число, т.к. value содержит строковый параметр
      }
    });

    const housingGuestsFilteredOffers = housingRoomsFilteredOffers.filter(function (estateObject) { // фильтрация данных из предыдущего фильтра по количеству гостей
      if (housingGuests === 'any') {
        return housingRoomsFilteredOffers;
      } else {
        return estateObject.offer.guests === parseInt(housingGuests, 10); // преобразуем строку в целое число, т.к. value содержит строковый параметр
      }
    });

    let facilitiesFilteredOffers = housingGuestsFilteredOffers; // создаём массив предложений, который далее будем фильтровать по критерию удобств

    for (let i = 0; i < facilitiesArray.length; i++) { // цикл проходит по всем элементам массива опций удобств
      if (facilitiesArray[i].checked) { // если удобство i чекнуто, то...
        facilitiesFilteredOffers = facilitiesFilteredOffers.filter(function (estateObject) { // фильтруем массив по удобству i
          return estateObject.offer.features.includes(facilitiesArray[i].value);
        });
      }
    }

    const filteredOffers = facilitiesFilteredOffers; // создаётся массив окончательно отфильтрованных предложений

    cb(filteredOffers);
  });
};

export {switchFiltersActivation, changeFiltersState};
