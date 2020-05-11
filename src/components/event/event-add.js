import {ACTIVITY_TYPE_NAME, ROUTE_POINTS_TYPES, TRANSFER_TYPE_NAME} from '../../consts/route-poinst.js';
import {capitalizeString, formatDate, formatTime} from '../../utils/common.js';
import Component from '../absctract/component.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {destinationsStore, offersStore} from '../../main.js';

const createEventEditTemplate = (event) => {
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
      `<datalist id="destination-list-add">
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
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-add">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${event.type.iconPath}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-add" type="checkbox">

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

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-add">
            ${event.type.supportingText}
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-add" 
            type="text" 
            name="event-destination" 
            value="${event.destination.name}" 
            list="destination-list-add"
          >
          ${getDestinationsListElement(destinationsStore)}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-add">
            From
          </label>
          <input 
            class="event__input  event__input--time" 
            id="event-start-time-add" 
            type="text" 
            name="event-start-time" 
            value="${formatDate(event.timeStart)} ${formatTime(event.timeStart)}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-add">
            To
          </label>
          <input 
            class="event__input  event__input--time" 
            id="event-end-time-add" 
            type="text" 
            name="event-end-time" 
            value="${formatDate(event.timeStart)} ${formatTime(event.timeEnd)}"
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-add">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input 
            class="event__input  event__input--price" 
            id="event-price-add"
            type="text" 
            name="event-price" 
            value="${event.price}"
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${event.isSaving ? `Saving…` : `Save`}</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      
      <section class="event__details">
      
        ${getOffersElement(event.offers)}
        
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${event.destination.description}</p>

          ${getPhotosElement(event.destination.pictures)}

        </section>
        
      </section>
    </form>`
  );
};

export default class EventEdit extends Component {
  constructor(event, eventIndex) {
    super();
    this._event = event;
    this._eventIndex = eventIndex;
    this._flatpickr = null;
    this._applyFlatpickr();

    this._formElement = this.element;
  }

  get template() {
    return createEventEditTemplate(this._event, this._eventIndex);
  }

  onTypeChange(handler) {
    const typeLists = this._formElement.elements[`event-type-list`];
    typeLists.forEach((list) => {
      list.addEventListener(`change`, () => {
        const type = Array.from(this._formElement.elements[`event-type`]).filter((el) => el.checked)[0].value;
        handler(type);
      });
    });
  }

  onPriceChange(handler) {
    const priceElement = this._formElement.elements[`event-price`];
    priceElement.addEventListener(`change`, () => {
      handler(priceElement.value);
    });
  }

  onDestinationChange(handler) {
    const destinationElement = this._formElement.elements[`event-destination`];

    destinationElement.addEventListener(`change`, () => {
      if (this._validateDestination()) {
        handler(destinationsStore.find((destination) => destination.name === destinationElement.value));
      }
    });
  }

  onTimeStartChange(handler) {
    const timeStartElement = this._formElement.elements[`event-start-time`];
    timeStartElement.addEventListener(`change`, () => {
      handler(timeStartElement.value);
    });
  }

  onTimeEndChange(handler) {
    const timeEndElement = this._formElement.elements[`event-end-time`];
    timeEndElement.addEventListener(`change`, () => {
      handler(timeEndElement.value);
    });
  }

  onOfferChange(handler) {
    const allOffers = offersStore.find((offer) => offer.type === this._event.type.name).offers;

    const offersElements = this._formElement.elements[`event-offer`];
    if (offersElements) {
      offersElements.forEach((offerElement) => offerElement.addEventListener(`change`, () => {
        const index = offerElement.id.replace(/\bevent-offer-\b/g, ``);
        handler(allOffers[index], offerElement.checked);
      }));
    }
  }

  onSubmitForm(handler) {
    this._formElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      if (this._validateDestination()) {
        handler();
      }
    });
  }

  onCancel(handler) {
    this._formElement.addEventListener(`reset`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }

  _validateDestination() {
    let isValid = true;

    const destinationElement = this._formElement.elements[`event-destination`];
    destinationElement.classList.remove(`input-error`);

    if (destinationsStore.findIndex((destination) => destination.name === destinationElement.value) === -1) {
      destinationElement.classList.add(`input-error`);
      isValid = false;
    }

    return isValid;
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
