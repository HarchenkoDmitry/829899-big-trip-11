import {filterType} from '../consts/filter.js';
import Component from './absctract/component.js';

const createFiltersTemplate = (filters) => {
  const getFilterLabel = (filterValue) => {
    switch (filterValue) {
      case filterType.EVERYTHING:
        return `Everything`;
      case filterType.FUTURE:
        return `Future`;
      case filterType.PAST:
        return `Past`;
      default:
        return ``;
    }
  };

  const filtersElement = filters.map((filter) => {

    const isDisabledFilter = filter.count === 0;
    return (
      `<div class="trip-filters__filter">
        <input 
          id="filter-${filter.name}" 
          class="trip-filters__filter-input visually-hidden" 
          type="radio" 
          name="trip-filter" 
          value="${filter.name}" 
          ${filter.isActive ? `checked` : ``}
          ${isDisabledFilter ? `disabled` : ``}
        >
        <label 
          class="trip-filters__filter-label ${isDisabledFilter ? `trip-filters--hidden` : ``}" 
          for="filter-${filter.name}"
        >
          ${getFilterLabel(filter.name)}
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

export default class Filters extends Component {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  set filters(value) {
    this._filters = value;
  }

  get template() {
    return createFiltersTemplate(this._filters);
  }

  onFilterChange(handler) {
    const formElement = this.element.querySelector(`form`);
    formElement.addEventListener(`change`, () => {
      handler(formElement[`trip-filter`].value);
    });
  }
}
