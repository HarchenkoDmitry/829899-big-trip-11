import Component from './absctract/component.js';

const createTripDaysItemTemplate = (day) => {
  const dayInfoElement = (dayNumber, date) => {
    return date !== null ?
      `<span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${date.format()}">
        ${date.format(`MMM D`)}
      </time>` :
      ``;
  };

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${dayInfoElement(day.dayNumber, day.date)}
      </div>
    </li>`
  );
};

export default class TripDaysItem extends Component {
  constructor(day) {
    super();
    this._day = day;
  }

  get template() {
    return createTripDaysItemTemplate(this._day);
  }
}
