import {createTripInfoTemplate} from './components/trip-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createFiltersTemplate} from './components/filters.js';
import {createSortTemplate} from './components/sort.js';
import {createTripDaysListTemplate} from './components/trip-days-list.js';

const render = (html, elem, where = `beforeend`) => {
  elem.insertAdjacentHTML(where, html);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMainElement = document.querySelector(`.page-body__page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);

render(createTripInfoTemplate(), siteTripMainElement, `afterbegin`);
render(createMenuTemplate(), siteTripControlsElement, `afterbegin`);
render(createFiltersTemplate(), siteTripControlsElement);
render(createSortTemplate(), siteTripEventsElement, `afterbegin`);
render(createTripDaysListTemplate(), siteTripEventsElement);
