import TripInfoController from '../controllers/trip-info.js';
import FilterController from '../controllers/filters.js';
import AddEventButtonController from '../controllers/add-event-button.js';
import MenuController from '../controllers/menu.js';

export class Header {
  constructor(tripInfoContainer, controlsElement, model) {
    this._tripInfoContainer = tripInfoContainer;
    this._controlsElement = controlsElement;
    this._model = model;

    this._tripInfoController = new TripInfoController(this._tripInfoContainer, this._model);
    this._menuController = new MenuController(this._controlsElement, this._model);
    this._filterController = new FilterController(this._controlsElement, this._model);
    this._addEventButton = new AddEventButtonController(this._tripInfoContainer, this._model);
  }

  render() {
    this._tripInfoController.render();
    this._menuController.render();
    this._filterController.render();
    this._addEventButton.render();
  }
}
