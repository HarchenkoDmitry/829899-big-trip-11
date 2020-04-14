import {Offer} from '../Offer.js';
import {RoutePoint} from '../RoutePoint.js';
import {random} from '../utils.js';
import {DESTINATIONS, OFFERS, RANDOM_TEXT, ROUTE_POINTS_TYPES, ROUTE_POINTS_TYPES_NAMES} from '../const.js';


export const generateRoutePoint = () => {
  const typeName = random.arrayItem(ROUTE_POINTS_TYPES_NAMES);
  const type = ROUTE_POINTS_TYPES.find((typesItem) => typesItem.name === typeName);

  const offersData = OFFERS.filter((offer) => offer.type === typeName);
  const offers = offersData.map((offersItem) => {
    const offer = new Offer(offersItem.type, offersItem.name, offersItem.price);
    offer.checked = random.bool();
    return offer;
  });

  const timeStart = new Date();
  const diffValue = random.int(0, 5);
  timeStart.setDate(timeStart.getDate() + diffValue);
  timeStart.setHours(random.int(0, 24));
  timeStart.setMinutes(random.int(0, 60));
  const timeEnd = new Date(timeStart);

  const duration = random.int(5, 120);
  timeEnd.setMinutes(timeStart.getMinutes() + duration);

  const destinationsText = RANDOM_TEXT.slice(0, random.int(1, 5)).join(` `);

  const photos = new Array(random.int(0, 10)).fill(``).map(() => `http://picsum.photos/248/152?r=${Math.random()}`);

  return new RoutePoint(
      type, timeStart, timeEnd, random.int(5, 300), offers,
      random.arrayItem(DESTINATIONS), random.bool(), destinationsText, photos
  );
};


export const generateRoutePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateRoutePoint);
};
