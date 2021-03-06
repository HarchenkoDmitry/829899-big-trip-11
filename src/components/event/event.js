import {formatTime, getDateDifference} from '../../utils/common.js';
import Component from '../absctract/component.js';
import {mode} from '../../models/route-point.js';

export const createEventTemplate = (event) => {
  const offersElement = event.offers
      .slice(0, 3)
      .map((offer) => {
        return (`<li class="event__offer">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>`
        );
      })
      .join(`\n`);

  return (`<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${event.type.iconPath}" alt="Event type icon">
        </div>
        <h3 class="event__title">${event.type.supportingText} ${event.destination.name}</h3>
  
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${event.timeStart.toISOString()}">
              ${formatTime(event.timeStart)}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${event.timeEnd.toISOString()}">
              ${formatTime(event.timeEnd)}
            </time>
          </p>
          <p class="event__duration">${getDateDifference(event.timeStart, event.timeEnd)}</p>
        </div>
  
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>
  
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersElement}
        </ul>
  
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends Component {
  constructor(event) {
    super();
    this._event = event;
  }

  onModeChange(handler) {
    const button = this.element.querySelector(`.event__rollup-btn`);
    button.addEventListener(`click`, () => {
      handler(mode.EDIT);
    });
  }

  get template() {
    return createEventTemplate(this._event);
  }
}
