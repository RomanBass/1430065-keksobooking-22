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
    const markerPane = document.querySelector('.leaflet-marker-pane'); // див с метками
    const markers = markerPane.querySelectorAll('.leaflet-marker-icon:not(.leaflet-marker-draggable)'); // все метки, кроме главной
    markers.forEach(marker => markerPane.removeChild(marker)); // удаление текущих меток, кроме главной

    const housingType = document.querySelector('#housing-type option:checked').value; // текущий параметр типа жилья из селектора
    const housingTypeFilteredOffers = dataToFilter.filter((estateObject) => { // фильтрация данных с сервера по типу жилья
      if (housingType === 'any') {
        return dataToFilter;
      } else {
        return estateObject.offer.type === housingType;
      }
    });

    const popupPane = document.querySelector('.leaflet-popup'); // див с балунами
    if (popupPane !== null) { // если див с балунами не пустой (проверка, чтобы не было ошибки с отcутствующим innerHTML)
      popupPane.innerHTML = '';  // вычищаем балун
    }

    cb(housingTypeFilteredOffers);
  });
};

export {filterForm, filters, switchFiltersActivation, changeFiltersState};
