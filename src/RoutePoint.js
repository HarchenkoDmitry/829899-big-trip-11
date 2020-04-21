export class RoutePoint {
  constructor(type, timeStart, timeEnd, price, offers, destination, isFavorite, destinationsText, photos) {
    this.type = type;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.price = Number(price);
    this.offers = offers;
    this.destination = destination;
    this.isFavorite = Boolean(isFavorite);
    this.destinationsText = destinationsText;
    this.photos = photos;
  }

  static compareDate(point1, point2) {
    if (point1.timeStart > point2.timeStart) {
      return 1;
    }
    if (point1.timeStart < point2.timeStart) {
      return -1;
    }
    return 0;
  }
}
