import Component from './absctract/component.js';

const createTravelCostTemplate = (totalPrice) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};

export default class TravelCost extends Component {
  constructor(totalPrice) {
    super();
    this._totalPrice = totalPrice;
  }

  get template() {
    return createTravelCostTemplate(this._totalPrice);
  }
}
