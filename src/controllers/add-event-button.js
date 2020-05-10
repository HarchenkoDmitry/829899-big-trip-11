import Controller from '../components/absctract/controller.js';
import AddEventButtonComponent from '../components/add-event-button.js';
import {defaultData, mode, RoutePoint} from '../models/route-point.js';
import {api} from '../main.js';
import {filterType} from '../consts/filter.js';
import {sort as sortType} from '../consts/sort.js';


export default class AddEventButtonController extends Controller {
  constructor(container, model) {
    super(container, model);

    this._onClick = this._onClick.bind(this);

    this._model.routePointsDataChangeObservable.add(this.render);
  }

  get viewComponent() {
    const viewComponent = new AddEventButtonComponent(this._model.isAddingPoint);
    viewComponent.onClick(this._onClick);
    return viewComponent;
  }

  _onClick() {
    const newPoint = new RoutePoint(defaultData);
    api.createPoint(newPoint)
      .then((point) => {
        this._model.routePoints.forEach((routePoint) => {
          routePoint.mode = mode.DEFAULT;
        });
        point.mode = mode.ADD;
        this._model.currentFilter = filterType.EVERYTHING;
        this._model.currentSort = sortType.EVENT;
        this._model.addRoutePoint(point);
      });
  }
}
