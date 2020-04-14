import {RoutePoint} from './RoutePoint.js';
import {MONTH_NAMES} from './const.js';

export class TripInfo {
  constructor(routePoints) {
    this.routePoints = TripInfo.sortRoutePoints(routePoints);
  }

  static sortRoutePoints(routePoints) {
    return routePoints.slice().sort(RoutePoint.compareDate);
  }

  get route() {
    let prepareRoute = this.routePoints
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
    return this.routePoints.reduce((totalPrice, point) => {
      const checkedOffers = point.offers.filter((offer) => offer.checked);
      const offersPrice = checkedOffers.length > 0 ?
        checkedOffers.reduce((totalOffersPrice, offer) => {
          return totalOffersPrice + offer.price;
        }, 0) : 0;
      return totalPrice + point.price + offersPrice;
    }, 0);
  }

  get duration() {
    const timeStart = this.routePoints[0].timeStart;
    const timeEnd = this.routePoints[this.routePoints.length - 1].timeEnd;

    const monthStart = MONTH_NAMES[timeStart.getMonth()];
    const monthEnd = MONTH_NAMES[timeEnd.getMonth()];

    const res = `${timeStart.getDate()} ${monthStart} — ${timeEnd.getDate()} ${monthEnd !== monthStart ? monthEnd : ``}`;
    return res.trim();
  }
}
