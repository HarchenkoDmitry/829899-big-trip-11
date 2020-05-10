import Component from '../absctract/component.js';

const createNoEventsTemplate = () => {
  return (
    `<div>
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">Click New Event to create your first point</p>
    </div>`
  );
};

export default class NoEvents extends Component {
  get template() {
    return createNoEventsTemplate();
  }
}
