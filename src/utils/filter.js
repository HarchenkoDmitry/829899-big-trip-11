import {filterType} from '../consts/filter.js';
import {RoutePoint} from '../models/route-point.js';

export const getRoutePointsByFilter = (routePoints, filter) => {
  switch (filter) {
    case filterType.FUTURE:
      return routePoints.filter(RoutePoint.filterFuturePoints);
    case filterType.PAST:
      return routePoints.filter(RoutePoint.filterPastPoints);
    default:
      return routePoints;
  }
};
