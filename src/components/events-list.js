import {createEventTemplate} from './event.js';
import {createEventEditTemplate} from './event-edit.js';

export const createEventsListTemplate = (routePoints, day) => {
  const events = routePoints.map((event, index) => {
    return createEventTemplate(event, index);
  }).join(`\n`);

  return (
    `<ul class="trip-events__list">
      ${day === 1 ? createEventEditTemplate(routePoints[0]) : ``}
      
      ${events}

    </ul>`
  );
};
