import {MONTH_NAMES} from '../consts/common.js';
import AbstractComponent from './abstract-component.js';
import EventsListComponent from './event/events-list.js';
import {sort} from '../consts/sort.js';

const createTripDaysListTemplate = (routePoints, currentSort) => {
  const days = [];
  routePoints.forEach((point) => {
    const date = new Date(point.timeStart);
    date.setHours(0, 0, 0, 0);
    const dateString = date.toLocaleDateString(`en`);
    if (!days.includes(dateString)) {
      days.push(dateString);
    }
  });

  const dayInfoElement = (dayNumber, date) => {
    return currentSort === sort.EVENT ?
      `<span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${date.toUTCString()}">
        ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}
      </time>` :
      ``;
  };

  const daysListElement = days.map((day, index) => {
    const date = new Date(day);

    const routePointsCurrentDay = routePoints.filter((point) => {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      return point.timeStart >= date && point.timeStart < nextDay;
    });

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          ${dayInfoElement(index + 1, date)}
        </div>
        ${new EventsListComponent(routePointsCurrentDay).template}
      </li>`
    );
  }).join(`\n`);

  return (
    `<ul class="trip-days">
      ${daysListElement}
    </ul>`
  );
};

export default class TripDaysList extends AbstractComponent {
  constructor(routePoints, currentSort) {
    super();
    this._routePoints = routePoints;
    this._currentSort = currentSort;
  }

  set routePoints(value) {
    this._routePoints = value;
  }

  set currentSort(value) {
    this._currentSort = value;
  }

  get template() {
    return createTripDaysListTemplate(this._routePoints, this._currentSort);
  }
}
