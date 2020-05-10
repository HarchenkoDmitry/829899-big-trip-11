import Component from './absctract/component.js';

const createTripDaysListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDaysList extends Component {
  constructor() {
    super();
  }

  get template() {
    return createTripDaysListTemplate();
  }
}
