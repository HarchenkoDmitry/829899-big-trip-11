import {generateRoutePoints} from './mock/route-points.js';
import {render, RenderPosition} from './utils/render.js';
import MenuComponent from './components/menu.js';
import {Trip} from './Trip.js';
import {TripController} from './controllers/trip-controller.js';

const routePoints = generateRoutePoints(10);
const trip = new Trip(routePoints);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainElement = document.querySelector(`.page-body__page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripControlsElement, new MenuComponent(), RenderPosition.AFTERBEGIN);

const tripController = new TripController(trip, siteTripMainElement, siteTripControlsElement, siteTripEventsElement);
tripController.render();
