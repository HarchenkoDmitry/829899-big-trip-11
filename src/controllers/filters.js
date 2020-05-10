import FiltersComponent from '../components/filters.js';
import {filterType} from '../consts/filter.js';
import {getRoutePointsByFilter} from '../utils/filter.js';
import Controller from '../components/absctract/controller.js';


export default class FilterController extends Controller {
  constructor(container, model) {
    super(container, model);

    this._model.routePointsDataChangeObservable.add(this.render);
    this._model.filterChangeObservable.add(this.render);

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  get viewComponent() {
    const viewComponent = new FiltersComponent(this.data);
    viewComponent.onFilterChange(this._onFilterChange);
    return viewComponent;
  }

  get data() {
    return Object.values(filterType).map((filter) => {
      return {
        name: filter,
        count: getRoutePointsByFilter(this._model.allRoutePointsByDate, filter).length,
        isActive: this._model.currentFilter === filter,
      };
    });
  }

  _onFilterChange(value) {
    this._model.currentFilter = value;
  }
}
