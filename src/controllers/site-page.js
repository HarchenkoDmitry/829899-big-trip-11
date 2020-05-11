import SortController from './sort.js';
import TripDaysListController from './trip-days-list.js';
import NoEventsComponent from '../components/event/no-events.js';
import {enumPosition, remove, render} from '../utils/render.js';
import {page} from '../consts/page.js';
import StatsController from './stats.js';
import RoutePointController from './route-point.js';
import {mode, newPointData, RoutePoint} from '../models/route-point.js';
import SortWrapComponent from '../components/sort-wrap.js';

export default class SitePageController {
  constructor(container, model) {
    this._model = model;
    this._container = container;

    this._sortWrapComponent = new SortWrapComponent();
    render(this._container, this._sortWrapComponent, enumPosition.AFTERBEGIN);

    this._sortController = new SortController(this._sortWrapComponent.element, this._model);
    this._tripDaysListController = new TripDaysListController(this._container, this._model);
    this._statsController = new StatsController(this._container, this._model);

    const newPoint = new RoutePoint(newPointData);
    newPoint.mode = mode.ADD;
    this._routePointController = new RoutePointController(this._sortWrapComponent.element, this._model, newPoint);

    this._noEventsComponent = new NoEventsComponent();

    this.render = this.render.bind(this);

    this._model.routePointsDataChangeObservable.add(this.render);
    this._model.pageChangeObservable.add(this.render);
    this._model.addingModeChangeObservable.add(this.render);
    this._model.filterChangeObservable.add(this.render);
  }

  _renderNoEvents() {
    render(this._container, this._noEventsComponent);
  }

  _removeNoEvents() {
    remove(this._noEventsComponent);
  }

  _renderTrip() {
    if (this._model.routePoints.length > 0 || this._model.isPointAddingMode) {
      this._sortController.render();
    } else {
      this._renderNoEvents();
    }

    this._tripDaysListController.render();

    if (this._model.isPointAddingMode) {
      this._routePointController.render();
    }
  }

  _removeTrip() {
    if (this._routePointController) {
      this._routePointController.remove();
    }
    this._sortController.remove();
    this._tripDaysListController.remove();
    this._removeNoEvents();
  }

  _renderStats() {
    this._statsController.render();
  }

  _removeStats() {
    this._statsController.remove();
  }

  render() {
    this._removeTrip();
    this._removeStats();
    switch (this._model.currentPage) {
      case page.TABLE: {
        this._renderTrip();
        break;
      }
      case page.STATS: {
        this._renderStats();
        break;
      }
    }
  }
}
