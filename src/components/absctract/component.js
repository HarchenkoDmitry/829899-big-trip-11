import {createElement} from '../../utils/common.js';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate AbstractComponent, only specific one.`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`Abstract method not implemented: get template`);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
