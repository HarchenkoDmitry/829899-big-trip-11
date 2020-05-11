import Component from './absctract/component.js';

const createSortWrapTemplate = () => {
  return (
    `<div class="trip-events-wrap"></div>`
  );
};

export default class SortWrap extends Component {
  constructor() {
    super();
  }

  get template() {
    return createSortWrapTemplate();
  }
}
