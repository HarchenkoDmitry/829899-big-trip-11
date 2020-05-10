import Component from './absctract/component.js';

const createRouteInformationTemplate = (route, duration) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${duration}</p>
    </div>`
  );
};

export default class RouteInformation extends Component {
  constructor(route, duration) {
    super();
    this._route = route;
    this._duration = duration;
  }

  get template() {
    return createRouteInformationTemplate(this._route, this._duration);
  }
}
