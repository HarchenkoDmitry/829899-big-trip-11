export class Offer {
  constructor(type, name, price) {
    this.type = type;
    this.name = name;
    this.price = Number(price);
    this._checked = false;
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    this._checked = Boolean(value);
  }
}
