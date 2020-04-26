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

  static filterFuturePoints(point) {
    return point.timeStart > new Date();
  }

  static filterPastPoints(point) {
    return point.timeEnd < new Date();
  }

  static compareDate(point1, point2) {
    if (point1.timeStart > point2.timeStart) {
      return 1;
    } else if (point1.timeStart < point2.timeStart) {
      return -1;
    } else {
      return 0;
    }
  }

  static compareDuration(point1, point2) {
    const duration1 = point1.timeEnd - point1.timeStart;
    const duration2 = point2.timeEnd - point2.timeStart;
    if (duration1 < duration2) {
      return 1;
    } else if (duration1 > duration2) {
      return -1;
    } else {
      return 0;
    }
  }

  static comparePrice(point1, point2) {
    if (point1.price < point2.price) {
      return 1;
    } else if (point1.price > point2.price) {
      return -1;
    } else {
      return 0;
    }
  }
}
