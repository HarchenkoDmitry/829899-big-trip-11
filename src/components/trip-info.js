import {createRouteInformationTemplate} from './route-information.js';
import {createTravelCostTemplate} from './travel-cost.js';

export const createTripInfoTemplate = (route, duration, totalPrice) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${createRouteInformationTemplate(route, duration)}
      ${createTravelCostTemplate(totalPrice)}
    </section>`
  );
};
