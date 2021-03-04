const filterForm = document.querySelector('.map__filters');
const filters = filterForm.querySelectorAll('select, fieldset');

const switchFiltersActivation = (deactivator) => {
  if (deactivator) {
    filterForm.classList.add('map__filters--disabled');
  } else {
    filterForm.classList.remove('map__filters--disabled');
  }

  filters.forEach((filter) => { // все фильтры делаются неактивными при deactivator = true
    filter.disabled = deactivator;
  });
}

export {filterForm, filters, switchFiltersActivation};
