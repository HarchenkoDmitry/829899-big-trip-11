import {Trip} from './models/trip.js';
import SitePageController from './controllers/site-page.js';
import {Header} from './components/header.js';
import API from './api.js';

const AUTHORIZATION = `Basic dXNlckBwasda9yZAo=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

export const api = new API(END_POINT, AUTHORIZATION);

const trip = new Trip();

export let offersStore;
export let destinationsStore;

api.routePoints
  .then((routePoints) => {
    trip.routePoints = routePoints;
  });

api.offers
  .then((offers) => {
    offersStore = offers;
  });

api.destinations
  .then((destinations) => {
    destinationsStore = destinations;
  });

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainElement = document.querySelector(`.page-body__page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

const header = new Header(siteTripMainElement, siteTripControlsElement, trip);
header.render();

const sitePageController = new SitePageController(siteTripEventsElement, trip);
sitePageController.render();
