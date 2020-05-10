import Component from '../absctract/component.js';

const createEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsList extends Component {
  constructor() {
    super();
  }

  get template() {
    return createEventsListTemplate();
  }
}
