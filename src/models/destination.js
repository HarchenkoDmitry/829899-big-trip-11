export class Destination {
  constructor(data) {
    this.name = data[`name`];
    this.description = data[`description`];
    this.pictures = data[`pictures`];
  }

  toRaw() {
    return {
      'name': this.name,
      'description': this.description,
      'pictures': this.pictures,
    };
  }
}
