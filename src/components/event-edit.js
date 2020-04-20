import {ACTIVITY_TYPE_NAME, DESTINATIONS, ROUTE_POINTS_TYPES, TRANSFER_TYPE_NAME} from '../const.js';
import {capitalizeString, formatDate, formatTime} from '../utils.js';

export const createEventEditTemplate = (event, eventIndex) => {
  const createTypeElement = (name, index) => {
    return (
      `<div class="event__type-item">
          <input 
            id="event-type-${name}-${index}" 
            class="event__type-input  visually-hidden" 
            type="radio" 
            name="event-type" 
            value="${name}"
          >
          <label 
            class="event__type-label  event__type-label--${name}" 
            for="event-type-${name}-${index}"
          >
            ${capitalizeString(name)}
          </label>
        </div>`
    );
  };

  const getTypesListElement = (type) => {
    return Object.keys(ROUTE_POINTS_TYPES)
      .filter((typeName) => {
        return ROUTE_POINTS_TYPES[typeName].type === type;
      })
      .map((typeName, index) => {
        return createTypeElement(typeName, index);
      }).join(`\n`);
  };

  const offersElement = event.offers.map((offer, index) => {
    return (`<div class="event__offer-selector">
        <input 
          class="event__offer-checkbox  visually-hidden" 
          id="event-offer-luggage-${index}" 
          type="checkbox" 
          name="event-offer-luggage" 
          ${offer.checked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-luggage-${index}">
          <span class="event__offer-title">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);

  const destinationsElement = DESTINATIONS.map((destination) => {
    return (
      `<option value="${destination}"></option>`
    );
  }).join(`\n`);

  const photosElement = event.photos.map((photo) => {
    return (
      `<img class="event__photo" src="${photo}" alt="Event photo">`
    );
  }).join(`\n`);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-${eventIndex}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${event.type.iconPath}" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-${eventIndex}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${getTypesListElement(TRANSFER_TYPE_NAME)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${getTypesListElement(ACTIVITY_TYPE_NAME)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-${eventIndex}">
              ${event.type.supportingText}
            </label>
            <input 
              class="event__input event__input--destination" 
              id="event-destination-${eventIndex}" 
              type="text" 
              name="event-destination" 
              value="${event.destination}" 
              list="destination-list-1"
            >
            <datalist id="destination-list-${eventIndex}">
              ${destinationsElement}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${eventIndex}">
              From
            </label>
            <input 
              class="event__input event__input--time" 
              id="event-start-time-${eventIndex}" 
              type="text" name="event-start-time" 
              value="${formatDate(event.timeStart)} ${formatTime(event.timeStart)}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-${eventIndex}">
              To
            </label>
            <input 
              class="event__input event__input--time" 
              id="event-end-time-${eventIndex}" 
              type="text" name="event-end-time" 
              value="${formatDate(event.timeStart)} ${formatTime(event.timeEnd)}"
            >
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-${eventIndex}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input 
              class="event__input event__input--price" 
              id="event-price-${eventIndex}" 
              type="text" 
              name="event-price" 
              value="${event.price}"
            >
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input 
            id="event-favorite-${eventIndex}" 
            class="event__favorite-checkbox visually-hidden" 
            type="checkbox" 
            name="event-favorite" 
            ${event.isFavorite ? `checked` : ``}
          >
          <label class="event__favorite-btn" for="event-favorite-${eventIndex}">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
        
          ${event.offers.length > 0 ? `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offersElement}
            </div>
          </section>` : ``}
          
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${event.destinationsText}</p>

            ${event.photos.length > 0 ? `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${photosElement}
              </div>
            </div>` : ``}
            
          </section>
          
        </section>
      </form>
    </li>`
  );
};
