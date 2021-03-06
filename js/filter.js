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

export {filterForm, filters, switchFiltersActivation};

//------------------------------------------------------------------------------

// filterForm.addEventListener('change', () => {
//   const markerPane = document.querySelector('.leaflet-marker-pane'); // див с метками
//   const markers = markerPane.querySelectorAll('.leaflet-marker-icon:not(.leaflet-marker-draggable)'); // все метки, кроме главной
//   markers.forEach(marker => markerPane.removeChild(marker)); // удаление текущих меток, кроме главной
// });
