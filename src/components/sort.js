import {sort} from '../consts/sort.js';
import Component from './absctract/component.js';

const createSortTemplate = (currentSort) => {
  const getSortName = (sortValue) => {
    switch (sortValue) {
      case sort.EVENT:
        return `Event`;
      case sort.PRICE:
        return `Price`;
      case sort.TIME:
        return `Time`;
      default:
        return ``;
    }
  };

  const sortsElement = Object.values(sort).map((sortItem) => {
    return (
      `<div class="trip-sort__item trip-sort__item--${sortItem}">
        <input 
          id="sort-${sortItem}" 
          class="trip-sort__input  visually-hidden" 
          type="radio" 
          name="trip-sort" 
          value="${sortItem}" 
          ${sortItem === currentSort ? `checked` : ``}
        >
        <label class="trip-sort__btn" for="sort-${sortItem}">${getSortName(sortItem)}</label>
      </div>`
    );
  }).join(`\n`);

  return (
    `<div>
      <h2 class="visually-hidden">Trip events</h2>
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">${currentSort === sort.EVENT ? `Day` : ``}</span>
  
        ${sortsElement}
  
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>
    </div>`
  );
};

export default class Sort extends Component {
  constructor(currentSort) {
    super();
    this._currentSort = currentSort;
  }

  set currentSort(value) {
    this._currentSort = value;
  }

  get template() {
    return createSortTemplate(this._currentSort);
  }

  onSortChange(handler) {
    const formElement = this.element.querySelector(`form`);
    formElement.addEventListener(`change`, () => {
      handler(formElement[`trip-sort`].value);
    });
  }
}
