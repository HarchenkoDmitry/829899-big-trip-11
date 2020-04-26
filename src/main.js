import {generateRoutePoints} from './mock/route-points.js';
import {render, RenderPosition} from './utils/render.js';
import {TripInfo} from './TripInfo.js';
import TripInfoComponent from './components/trip-info.js';
import MenuComponent from './components/menu.js';
import FiltersComponent from './components/filters.js';
import SortComponent from './components/sort.js';
import TripDaysListComponent from './components/trip-days-list.js';

const routePoints = generateRoutePoints(5);
const tripInfo = new TripInfo(routePoints);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainElement = document.querySelector(`.page-body__page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripMainElement, new TripInfoComponent(tripInfo.route, tripInfo.duration, tripInfo.totalPrice), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new MenuComponent(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, new FiltersComponent());
render(siteTripEventsElement, new SortComponent(), RenderPosition.AFTERBEGIN);
render(siteTripEventsElement, new TripDaysListComponent(tripInfo.routePoints));
