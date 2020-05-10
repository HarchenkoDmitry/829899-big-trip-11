import {remove, render} from '../../utils/render.js';

export default class Controller {
  constructor(container, model) {
    if (new.target === Controller) {
      throw new Error(`Can't instantiate AbstractComponent, only specific one.`);
    }

    this._container = container;
    this._model = model;
    this._place = null;
    this._viewComponent = null;

    this.render = this.render.bind(this);
  }

  get viewComponent() {
    throw new Error(`Abstract method not implemented: get viewComponent`);
  }

  set place(value) {
    this._place = value;
  }

  render() {
    if (this._viewComponent) {
      remove(this._viewComponent);
    }

    this._viewComponent = this.viewComponent;

    render(this._container, this._viewComponent, this._place);
  }
}
