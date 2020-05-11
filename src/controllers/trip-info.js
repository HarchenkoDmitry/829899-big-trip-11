import Controller from '../components/absctract/controller.js';
import TripInfoComponent from '../components/trip-info.js';
import {enumPosition} from '../utils/render.js';


export default class TripInfoController extends Controller {
  constructor(container, model) {
    super(container, model);
    this.place = enumPosition.AFTERBEGIN;

    this._model.routePointsDataChangeObservable.add(this.render);
  }

  get viewComponent() {
    return new TripInfoComponent(this.data);
  }

  get data() {
    const allRoutePointsByDate = this._model.allRoutePointsByDate;

    const getRoute = (routePoints) => {
      let prepareRoute = routePoints
        .map((point) => {
          return point.destination.name;
        })
        .filter((destination, index, arr) => {
          return index > 0 ? arr[index - 1] !== destination : true;
        });
      if (prepareRoute.length > 3) {
        prepareRoute = [prepareRoute[0], `...`, prepareRoute[prepareRoute.length - 1]];
      }
      return prepareRoute.join(` &mdash; `);
    };

    const getDuration = (routePoints) => {
      if (routePoints.length > 0) {
        const timeStart = routePoints[0].timeStart;
        const timeEnd = routePoints[routePoints.length - 1].timeEnd;

        const monthStart = timeStart.format(`MMM`);
        const monthEnd = timeEnd.format(`MMM`);

        const res = `${timeStart.date()} ${monthStart} — ${timeEnd.date()} ${monthEnd !== monthStart ? monthEnd : ``}`;
        return res.trim();
      } else {
        return ``;
      }
    };

    const getTotalPrice = (routePoints) => {
      return routePoints.reduce((totalPrice, point) => {
        const offersPrice = point.offers.length > 0 ?
          point.offers.reduce((totalOffersPrice, offer) => {
            return totalOffersPrice + offer.price;
          }, 0) : 0;
        return totalPrice + point.price + offersPrice;
      }, 0);
    };

    return {
      route: getRoute(allRoutePointsByDate),
      duration: getDuration(allRoutePointsByDate),
      totalPrice: getTotalPrice(allRoutePointsByDate),
    };
  }
}
