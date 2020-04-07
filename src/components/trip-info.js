import {createRouteInformationTemplate} from './route-information.js';
import {createTravelCostTemplate} from './travel-cost.js';

export const createTripInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${createRouteInformationTemplate()}
      ${createTravelCostTemplate()}
    </section>`
  );
};
