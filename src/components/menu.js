import Component from './absctract/component.js';
import {page} from '../consts/page.js';

const createMenuTemplate = (currentPage) => {

  const getPageName = (pageName) => {
    switch (pageName) {

      case page.TABLE:
        return `Table`;

      case page.STATS:
        return `Stats`;

      default:
        return ``;
    }
  };

  const linksElements = Object.values(page).map((pageName) => {
    return (
      `<a 
        class="trip-tabs__btn ${currentPage === pageName ? `trip-tabs__btn--active` : ``}" 
        href="#"
        data-page="${pageName}"
      >
        ${getPageName(pageName)}
      </a>`
    );
  }).join(`\n`);


  return (
    `<div>
      <h2 class="visually-hidden">Switch trip view</h2>
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${linksElements}
      </nav>
    </div>`
  );
};

export default class Menu extends Component {
  constructor(currentPage) {
    super();

    this._currentPage = currentPage;
  }

  onPageChange(handler) {
    const buttons = this.element.querySelectorAll(`.trip-tabs__btn`);

    buttons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        if (button.dataset.page !== this._currentPage) {
          handler(button.dataset.page);
        }
      });
    });
  }

  get template() {
    return createMenuTemplate(this._currentPage);
  }
}
