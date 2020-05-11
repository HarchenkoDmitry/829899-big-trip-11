import {mode, RoutePoint} from './route-point.js';
import {sort} from '../consts/sort.js';
import {filterType} from '../consts/filter.js';
import Observable from '../components/observable.js';
import {getRoutePointsByFilter} from '../utils/filter.js';
import {page} from '../consts/page.js';

export class Trip {
  constructor() {
    this._currentSort = sort.EVENT;
    this._currentFilter = filterType.EVERYTHING;
    this._currentPage = page.TABLE;

    this._routePoints = []; // all route points sorted by date
    this._isPointAddingMode = false;

    this._pageChangeObservable = new Observable();
    this._addingModeChangeObservable = new Observable();
    this._routePointsDataChangeObservable = new Observable();
    this._sortChangeObservable = new Observable();
    this._filterChangeObservable = new Observable();
  }

  get routePoints() {
    return Trip._prepareRoutePoints(this._routePoints, this._currentFilter, this._currentSort);
  }

  set routePoints(value) {
    this._routePoints = Trip._sortRoutePoints(value, sort.EVENT);
    this._routePointsDataChangeObservable.notify();
  }

  get allRoutePointsByDate() {
    return this._routePoints;
  }

  get currentSort() {
    return this._currentSort;
  }

  set currentSort(value) {
    if (value !== this._currentSort && Object.values(sort).includes(value)) {
      this._currentSort = value;
      this._sortChangeObservable.notify();
    }
  }

  get currentFilter() {
    return this._currentFilter;
  }

  set currentFilter(value) {
    if (value !== this._currentFilter && Object.values(filterType).includes(value)) {
      this._currentFilter = value;
      this._filterChangeObservable.notify();
    }
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(value) {
    if (value !== this._currentPage && Object.values(page).includes(value)) {
      this._currentPage = value;
      this._pageChangeObservable.notify();
    }
  }

  get isPointAddingMode() {
    return this._isPointAddingMode;
  }

  set isPointAddingMode(value) {
    this._isPointAddingMode = Boolean(value);
    this._addingModeChangeObservable.notify();
  }

  get pageChangeObservable() {
    return this._pageChangeObservable;
  }

  get addingModeChangeObservable() {
    return this._addingModeChangeObservable;
  }

  get routePointsDataChangeObservable() {
    return this._routePointsDataChangeObservable;
  }

  get sortChangeObservable() {
    return this._sortChangeObservable;
  }

  get filterChangeObservable() {
    return this._filterChangeObservable;
  }

  static _sortRoutePoints(routePoints, sortType) {
    const sortedRoutePoints = routePoints.slice();
    switch (sortType) {
      case sort.EVENT:
        sortedRoutePoints.sort(RoutePoint.compareDate);
        break;
      case sort.TIME:
        sortedRoutePoints.sort(RoutePoint.compareDuration);
        break;
      case sort.PRICE:
        sortedRoutePoints.sort(RoutePoint.comparePrice);
        break;
    }
    const addedPointIndex = sortedRoutePoints.findIndex((point) => point.mode === mode.ADD);
    if (addedPointIndex > 0) {
      sortedRoutePoints.unshift(sortedRoutePoints.splice(addedPointIndex, 1)[0]);
    }
    return sortedRoutePoints;
  }

  static _prepareRoutePoints(routePoints, currentFilter, currentSort) {
    routePoints = getRoutePointsByFilter(routePoints, currentFilter);

    routePoints = Trip._sortRoutePoints(routePoints, currentSort);

    return routePoints;
  }

  addRoutePoint(point) {
    this._routePoints.push(point);
    this._routePointsDataChangeObservable.notify();
  }

  deleteRoutePoint(id) {
    this._routePoints = this._routePoints.filter((point) => point.id !== id);
    this._routePointsDataChangeObservable.notify();
  }
}
