import {RoutePoint} from './RoutePoint.js';
import {MONTH_NAMES} from './consts/common.js';
import {sort} from './consts/sort.js';
import {filter} from './consts/filter.js';

export class Trip {
  constructor(routePoints) {
    this._currentSort = sort.EVENT;
    this._currentFilter = filter.EVERYTHING;
    this._routePoints = Trip.sortRoutePoints(routePoints, sort.EVENT);
    this._convertedRoutePoints = this.convertRoutePoints(this._routePoints);
    this._arrDisabledFilters = Trip.getArrDisabledFilter(this._routePoints);
  }

  get arrDisabledFilters() {
    return this._arrDisabledFilters;
  }

  get routePoints() {
    return this._routePoints;
  }

  get convertedRoutePoints() {
    return this._convertedRoutePoints;
  }

  get currentSort() {
    return this._currentSort;
  }

  set currentSort(value) {
    if (Object.values(sort).includes(value)) {
      this._currentSort = value;
      this._convertedRoutePoints = this.convertRoutePoints(this._routePoints);
    }
  }

  get currentFilter() {
    return this._currentFilter;
  }

  set currentFilter(value) {
    if (Object.values(filter).includes(value)) {
      this._currentFilter = value;
      this._convertedRoutePoints = this.convertRoutePoints(this._routePoints);
    }
  }

  get route() {
    let prepareRoute = this._routePoints
      .map((point) => {
        return point.destination;
      })
      .filter((destination, index, arr) => {
        return index > 0 ? arr[index - 1] !== destination : true;
      });
    if (prepareRoute.length > 3) {
      prepareRoute = [prepareRoute[0], `...`, prepareRoute[prepareRoute.length - 1]];
    }

    return prepareRoute.join(` &mdash; `);
  }

  get totalPrice() {
    return this._routePoints.reduce((totalPrice, point) => {
      const checkedOffers = point.offers.filter((offer) => offer.checked);
      const offersPrice = checkedOffers.length > 0 ?
        checkedOffers.reduce((totalOffersPrice, offer) => {
          return totalOffersPrice + offer.price;
        }, 0) : 0;
      return totalPrice + point.price + offersPrice;
    }, 0);
  }

  get duration() {
    if (this._routePoints.length > 0) {
      const timeStart = this._routePoints[0].timeStart;
      const timeEnd = this._routePoints[this._routePoints.length - 1].timeEnd;

      const monthStart = MONTH_NAMES[timeStart.getMonth()];
      const monthEnd = MONTH_NAMES[timeEnd.getMonth()];

      const res = `${timeStart.getDate()} ${monthStart} — ${timeEnd.getDate()} ${monthEnd !== monthStart ? monthEnd : ``}`;
      return res.trim();
    } else {
      return ``;
    }
  }

  static sortRoutePoints(routePoints, sortType) {
    switch (sortType) {
      case sort.EVENT:
        return routePoints.slice().sort(RoutePoint.compareDate);
      case sort.TIME:
        return routePoints.slice().sort(RoutePoint.compareDuration);
      case sort.PRICE:
        return routePoints.slice().sort(RoutePoint.comparePrice);
      default:
        return routePoints;
    }
  }

  static getArrDisabledFilter(routePoints) {
    let arr = [];
    if (routePoints.findIndex(RoutePoint.filterFuturePoints) === -1) {
      arr.push(filter.FUTURE);
    }
    if (routePoints.findIndex(RoutePoint.filterPastPoints) === -1) {
      arr.push(filter.PAST);
    }
    return arr;
  }

  convertRoutePoints() {
    let routePoints;

    switch (this._currentFilter) {
      case filter.FUTURE:
        routePoints = this._routePoints.filter(RoutePoint.filterFuturePoints);
        break;
      case filter.PAST:
        routePoints = this._routePoints.filter(RoutePoint.filterPastPoints);
        break;
      default:
        routePoints = this._routePoints;
    }

    routePoints = this._currentSort === sort.EVENT ?
      routePoints :
      Trip.sortRoutePoints(routePoints, this._currentSort);

    return routePoints;
  }
}
