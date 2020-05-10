import {ACTIVITY_TYPE_NAME, ROUTE_POINTS_TYPES, TRANSFER_TYPE_NAME} from '../../consts/route-poinst.js';
import {capitalizeString, formatDate, formatTime} from '../../utils/common.js';
import Component from '../absctract/component.js';
import {mode} from '../../models/route-point.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {destinationsStore, offersStore} from '../../main.js';

const createEventEditTemplate = (event, eventIndex) => {
  const createTypeElement = (name, index) => {
    return (
      `<div class="event__type-item">
          <input 
            id="event-type-${name}-${index}" 
            class="event__type-input  visually-hidden" 
            type="radio" 
            name="event-type" 
            value="${name}"
            ${event.type.name === name ? `checked` : ``}
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
    return ROUTE_POINTS_TYPES
      .filter((typeItem) => {
        return typeItem.type === type;
      })
      .map((typeItem, index) => {
        return createTypeElement(typeItem.name, index);
      }).join(`\n`);
  };

  const getOffersElement = (offers) => {
    const allOffers = offersStore.find((offer) => offer.type === event.type.name).offers;

    const offersElement = allOffers.map((offer, index) => {
      const isChecked = offers.findIndex((offersItem) => offersItem.name === offer.name) !== -1;

      return (`<div class="event__offer-selector">
        <input 
          class="event__offer-checkbox  visually-hidden" 
          id="event-offer-${index}" 
          type="checkbox" 
          name="event-offer" 
          ${isChecked ? `checked` : ``}
        >
        <label class="event__offer-label" for="event-offer-${index}">
          <span class="event__offer-title">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
      );
    }).join(`\n`);

    return allOffers.length > 0 ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersElement}
        </div>
      </section>` : ``;
  };

  const getDestinationsListElement = (destinations) => {
    const destinationsElement = destinations.map((destination) => {
      return (
        `<option value="${destination.name}"></option>`
      );
    }).join(`\n`);

    return (
      `<datalist id="destination-list-${eventIndex}">
        ${destinationsElement}
      </datalist>`
    );
  };

  const getPhotosElement = (pictures) => {
    if (!pictures) {
      return ``;
    }

    const photosList = pictures.map((photo) => {
      return (
        `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
      );
    }).join(`\n`);

    return pictures.length > 0 ?
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosList}
        </div>
      </div>` : ``;
  };

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
              <fieldset class="event__type-group" name="event-type-list">
                <legend class="visually-hidden">Transfer</legend>
                ${getTypesListElement(TRANSFER_TYPE_NAME)}
              </fieldset>

              <fieldset class="event__type-group" name="event-type-list">
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
              value="${event.destination.name}"
              list="destination-list-${eventIndex}"
            >
            ${getDestinationsListElement(destinationsStore)}
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

          <button class="event__save-btn btn btn--blue" type="submit">${event.isSaving ? `Saving…` : `Save`}</button>
          <button class="event__reset-btn" type="reset">${event.isDeleting ? `Deleting…` : `Delete`}</button>

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

          ${getOffersElement(event.offers)}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${event.destination.description}</p>

            ${getPhotosElement(event.destination.pictures)}

          </section>

        </section>
      </form>
    </li>`
  );
};

export default class EventEdit extends Component {
  constructor(event, eventIndex) {
    super();
    this._event = event;
    this._eventIndex = eventIndex;
    this._flatpickr = null;
    this._applyFlatpickr();
  }

  get template() {
    return createEventEditTemplate(this._event, this._eventIndex);
  }

  onModeChange(handler) {
    const button = this.element.querySelector(`.event__rollup-btn`);
    button.addEventListener(`click`, () => {
      handler(mode.DEFAULT);
    });
  }

  onFavoriteChange(handler) {
    const inputFavorite = this.element.querySelector(`#event-favorite-${this._eventIndex}`);
    inputFavorite.addEventListener(`change`, () => {
      handler(inputFavorite.checked);
    });
  }

  onTypeChange(handler) {
    const form = this.element.querySelector(`form`);

    const typeLists = form.elements[`event-type-list`];
    typeLists.forEach((list) => {
      list.addEventListener(`change`, () => {
        const type = Array.from(form.elements[`event-type`]).filter((el) => el.checked)[0].value;
        handler(type);
      });
    });
  }

  onPriceChange(handler) {
    const form = this.element.querySelector(`form`);

    const priceElement = form.elements[`event-price`];
    priceElement.addEventListener(`change`, () => {
      handler(priceElement.value);
    });
  }

  onDestinationChange(handler) {
    const form = this.element.querySelector(`form`);

    const destinationElement = form.elements[`event-destination`];
    destinationElement.classList.remove(`input-error`);
    destinationElement.addEventListener(`change`, () => {
      if (destinationsStore.findIndex((destination) => destination.name === destinationElement.value) !== -1) {
        handler(destinationsStore.find((destination) => destination.name === destinationElement.value));
      } else {
        destinationElement.classList.add(`input-error`);
      }
    });
  }

  onTimeStartChange(handler) {
    const form = this.element.querySelector(`form`);

    const timeStartElement = form.elements[`event-start-time`];
    timeStartElement.addEventListener(`change`, () => {
      handler(timeStartElement.value);
    });
  }

  onTimeEndChange(handler) {
    const form = this.element.querySelector(`form`);

    const timeEndElement = form.elements[`event-end-time`];
    timeEndElement.addEventListener(`change`, () => {
      handler(timeEndElement.value);
    });
  }

  onOfferChange(handler) {
    const allOffers = offersStore.find((offer) => offer.type === this._event.type.name).offers;

    const form = this.element.querySelector(`form`);

    const offersElements = form.elements[`event-offer`];
    if (offersElements) {
      offersElements.forEach((offerElement) => offerElement.addEventListener(`change`, () => {
        const index = offerElement.id.replace(/\bevent-offer-\b/g, ``);
        handler(allOffers[index], offerElement.checked);
      }));
    }
  }

  onSubmitForm(handler) {
    const form = this.element.querySelector(`form`);
    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  onDelete(handler) {
    const form = this.element.querySelector(`form`);
    form.addEventListener(`reset`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const dateElements = this.element.querySelectorAll(`.event__input--time`);
    dateElements.forEach((el) => {
      this._flatpickr = flatpickr(el, {
        allowInput: true,
        enableTime: true,
        dateFormat: `d/m/y H:i`,
      });
    });
  }
}
