import Component from '../absctract/component.js';

const createEventWrapTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class EventWrap extends Component {
  constructor() {
    super();
  }

  get template() {
    return createEventWrapTemplate();
  }
}
