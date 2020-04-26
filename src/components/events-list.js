import AbstractComponent from './abstract-component.js';
import EventComponent from './event.js';
import EventEditComponent from './event-edit.js';

const createEventsListTemplate = (routePoints, day) => {
  const events = routePoints.map((event, index) => {
    return new EventComponent(event, index).template;
  }).join(`\n`);

  return (
    `<ul class="trip-events__list">
      ${day === 1 ? new EventEditComponent(routePoints[0], 0).template : ``}
      ${events}
    </ul>`
  );
};

export default class EventsList extends AbstractComponent {
  constructor(routePoints, day) {
    super();
    this._routePoints = routePoints;
    this._day = day;
  }

  get template() {
    return createEventsListTemplate(this._routePoints, this._day);
  }
}
