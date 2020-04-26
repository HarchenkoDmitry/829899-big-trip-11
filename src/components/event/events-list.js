import AbstractComponent from '../abstract-component.js';
import EventComponent from './event.js';

const createEventsListTemplate = (routePoints) => {
  const events = routePoints.map((event, index) => {
    return new EventComponent(event, index).template;
  }).join(`\n`);

  return (
    `<ul class="trip-events__list">
      ${events}
    </ul>`
  );
};

export default class EventsList extends AbstractComponent {
  constructor(routePoints) {
    super();
    this._routePoints = routePoints;
  }

  get template() {
    return createEventsListTemplate(this._routePoints);
  }
}
