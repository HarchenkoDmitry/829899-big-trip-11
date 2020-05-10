import {RoutePoint} from './models/route-point.js';
import {Offer} from './models/offer.js';
import {Destination} from './models/destination.js';


const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  get routePoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then((points) => points.map((point) => new RoutePoint(point)));
  }

  get offers() {
    return this._load({url: `offers`})
      .then((response) => response.json())
      .then((offers) => offers.map((item) => {
        return {
          type: item[`type`],
          offers: item[`offers`].map((offer) => new Offer(offer)),
        };
      }));
  }

  get destinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json())
      .then((destinations) => destinations.map((destination) => new Destination(destination)));
  }

  createPoint(newPoint) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(newPoint.toRaw()),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then((response) => response.json())
      .then((point) => new RoutePoint(point));
  }

  updatePoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then((response) => response.json())
      .then((point) => new RoutePoint(point));
  }

  deletePoint(id) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
