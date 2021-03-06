import Component from './absctract/component.js';
import RouteInformationComponent from './route-information.js';
import TravelCostComponent from './travel-cost.js';

const createTripInfoTemplate = (route, duration, totalPrice) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${new RouteInformationComponent(route, duration).template}
      ${new TravelCostComponent(totalPrice).template}
    </section>`
  );
};

export default class TripInfo extends Component {
  constructor({route, duration, totalPrice}) {
    super();
    this._route = route;
    this._duration = duration;
    this._totalPrice = totalPrice;
  }

  get template() {
    return createTripInfoTemplate(this._route, this._duration, this._totalPrice);
  }
}
