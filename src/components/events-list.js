import {createEventTemplate} from './event.js';
import {createEventEditTemplate} from './event-edit.js';

export const createEventsListTemplate = () => {
  const AMOUNT_EVENTS = 3;
  const events = [];

  for (let i = 0; i < AMOUNT_EVENTS; i++) {
    events.push(createEventTemplate());
  }

  return (
    `<ul class="trip-events__list">
      ${createEventEditTemplate()}
      
      ${events.join(``)}

    </ul>`
  );
};
