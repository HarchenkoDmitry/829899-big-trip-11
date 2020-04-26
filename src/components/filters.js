import {filter} from '../consts/filter.js';
import AbstractComponent from './abstract-component.js';

const createFiltersTemplate = (currentFilter, arrDisabledFilters) => {
  const getFilterName = (filterValue) => {
    switch (filterValue) {
      case filter.EVERYTHING:
        return `Everything`;
      case filter.FUTURE:
        return `Future`;
      case filter.PAST:
        return `Past`;
      default:
        return ``;
    }
  };

  const filtersElement = Object.values(filter).map((filterItem) => {
    return (
      `<div class="trip-filters__filter">
        <input 
          id="filter-${filterItem}" 
          class="trip-filters__filter-input visually-hidden" 
          type="radio" 
          name="trip-filter" 
          value="${filterItem}" 
          ${filterItem === currentFilter ? `checked` : ``}
          ${arrDisabledFilters.includes(filterItem) ? `disabled` : ``}
        >
        <label 
          class="trip-filters__filter-label ${arrDisabledFilters.includes(filterItem) ? `trip-filters--hidden` : ``}" 
          for="filter-${filterItem}"
        >
          ${getFilterName(filterItem)}
        </label>
      </div>`
    );
  }).join(`\n`);

  return (
    `<div>
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        
        ${filtersElement}
  
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
};

export default class Filters extends AbstractComponent {
  constructor(currentFilter, arrDisabledFilters) {
    super();
    this._currentFilter = currentFilter;
    this._arrDisabledFilters = arrDisabledFilters;
  }

  setFilterChangeHandler(handler) {
    const formElement = this.element.querySelector(`form`);
    formElement.addEventListener(`change`, () => {
      handler(formElement[`trip-filter`].value);
    });
  }

  get template() {
    return createFiltersTemplate(this._currentFilter, this._arrDisabledFilters);
  }
}
