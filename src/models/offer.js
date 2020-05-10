export class Offer {
  constructor(data) {
    this.name = data[`title`];
    this.price = Number(data[`price`]);
  }

  toRaw() {
    return {
      'title': this.name,
      'price': this.price,
    };
  }
}
