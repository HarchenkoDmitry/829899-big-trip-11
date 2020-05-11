import Controller from '../components/absctract/controller.js';
import AddEventButtonComponent from '../components/add-event-button.js';
import {mode} from '../models/route-point.js';
import {filterType} from '../consts/filter.js';
import {sort as sortType} from '../consts/sort.js';
import {page} from '../consts/page.js';


export default class AddEventButtonController extends Controller {
  constructor(container, model) {
    super(container, model);

    this._onClick = this._onClick.bind(this);

    this._model.addingModeChangeObservable.add(this.render);
  }

  get viewComponent() {
    const viewComponent = new AddEventButtonComponent(this._model.isPointAddingMode);
    viewComponent.onClick(this._onClick);
    return viewComponent;
  }

  _onClick() {
    this._model.isPointAddingMode = true;
    this._model.currentPage = page.TABLE;
    this._model.currentFilter = filterType.EVERYTHING;
    this._model.currentSort = sortType.EVENT;
    this._model.routePoints.forEach((routePoint) => {
      routePoint.mode = mode.DEFAULT;
    });
  }
}
