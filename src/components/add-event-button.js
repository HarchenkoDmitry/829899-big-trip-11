import Component from './absctract/component.js';

const createAddEventButtonTemplate = (isDisabled) => {
  return (
    `<button 
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow" 
      type="button"
      ${isDisabled ? `disabled` : ``}
    >New event</button>`
  );
};

export default class AddEventButtonComponent extends Component {
  constructor(isDisabled) {
    super();
    this._isDisabled = isDisabled;
  }

  get template() {
    return createAddEventButtonTemplate(this._isDisabled);
  }

  onClick(handler) {
    const button = this.element;
    button.addEventListener(`click`, () => {
      handler();
    });
  }
}
