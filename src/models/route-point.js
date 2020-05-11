import Observable from '../components/observable.js';
import Moment from 'moment';
import {Destination} from './destination.js';
import {Offer} from './offer.js';
import {ROUTE_POINTS_TYPES} from '../consts/route-poinst.js';

export const mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`,
};

export const newPointData = {
  'base_price': ``,
  'type': ROUTE_POINTS_TYPES[0].name,
  'date_from': new Moment().format(),
  'date_to': new Moment().format(),
  'offers': [],
  'destination': {
    'name': ``
  },
  'is_favorite': false,
};

export class RoutePoint {
  constructor(data) {
    this._id = data[`id`];
    this._type = ROUTE_POINTS_TYPES.find((typeItem) => typeItem.name === data[`type`]);
    this._timeStart = new Moment(data[`date_from`]);
    this._timeEnd = new Moment(data[`date_to`]);
    this._price = Number(data[`base_price`]);
    this._offers = data[`offers`].map((offer) => new Offer(offer));
    this._destination = new Destination(data[`destination`]);
    this._isFavorite = Boolean(data[`is_favorite`]);
    this._mode = mode.DEFAULT;

    this._onDataChangeObservable = new Observable();
  }

  toRaw() {
    return {
      'id': this._id,
      'type': this._type.name,
      'date_from': this._timeStart.format(),
      'date_to': this._timeEnd.format(),
      'base_price': this._price,
      'offers': this._offers.map((offer) => offer.toRaw()),
      'destination': this._destination.toRaw(),
      'is_favorite': this._isFavorite,
    };
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get timeStart() {
    return this._timeStart;
  }

  set timeStart(value) {
    this._timeStart = value;
  }

  get timeEnd() {
    return this._timeEnd;
  }

  set timeEnd(value) {
    this._timeEnd = value;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    this._price = value;
    this._onDataChangeObservable.notify();
  }

  get offers() {
    return this._offers;
  }

  set offers(value) {
    this._offers = value;
  }

  get destination() {
    return this._destination;
  }

  set destination(value) {
    this._destination = value;
  }

  get isFavorite() {
    return this._isFavorite;
  }

  set isFavorite(value) {
    this._isFavorite = value;
    this._onDataChangeObservable.notify();
  }

  get mode() {
    return this._mode;
  }

  set mode(value) {
    if (Object.values(mode).includes(value)) {
      this._mode = value;
      this._onDataChangeObservable.notify();
    }
  }

  static filterFuturePoints(point) {
    return point.timeStart > new Date();
  }

  static filterPastPoints(point) {
    return point.timeEnd < new Date();
  }

  static compareDate(point1, point2) {
    if (point1.timeStart > point2.timeStart) {
      return 1;
    } else if (point1.timeStart < point2.timeStart) {
      return -1;
    } else {
      return 0;
    }
  }

  static compareDuration(point1, point2) {
    const duration1 = point1.timeEnd - point1.timeStart;
    const duration2 = point2.timeEnd - point2.timeStart;
    if (duration1 < duration2) {
      return 1;
    } else if (duration1 > duration2) {
      return -1;
    } else {
      return 0;
    }
  }

  static comparePrice(point1, point2) {
    if (point1.price < point2.price) {
      return 1;
    } else if (point1.price > point2.price) {
      return -1;
    } else {
      return 0;
    }
  }
}
