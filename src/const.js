export const MONTH_NAMES = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

const generateRoutePointType = (name, type, supportingText, iconName) => {
  const path = `img/icons/`;
  return ({name, type, supportingText, iconPath: path + iconName});
};

export const TRANSFER_TYPE_NAME = `transfer`;
export const ACTIVITY_TYPE_NAME = `activity`;

export const ROUTE_POINTS_TYPES = [
  generateRoutePointType(`check-in`, ACTIVITY_TYPE_NAME, `Check-in in`, `check-in.png`),
  generateRoutePointType(`sightseeing`, ACTIVITY_TYPE_NAME, `Sightseeing in`, `sightseeing.png`),
  generateRoutePointType(`restaurant`, ACTIVITY_TYPE_NAME, `Restaurant in`, `restaurant.png`),
  generateRoutePointType(`taxi`, TRANSFER_TYPE_NAME, `Taxi to`, `taxi.png`),
  generateRoutePointType(`bus`, TRANSFER_TYPE_NAME, `Bus to`, `bus.png`),
  generateRoutePointType(`train`, TRANSFER_TYPE_NAME, `Train to`, `train.png`),
  generateRoutePointType(`ship`, TRANSFER_TYPE_NAME, `Ship to`, `ship.png`),
  generateRoutePointType(`transport`, TRANSFER_TYPE_NAME, `Transport to`, `transport.png`),
  generateRoutePointType(`drive`, TRANSFER_TYPE_NAME, `Drive to`, `drive.png`),
  generateRoutePointType(`flight`, TRANSFER_TYPE_NAME, `Flight to`, `flight.png`),
];

export const ROUTE_POINTS_TYPES_NAMES = [
  `check-in`, `sightseeing`, `restaurant`, `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`,
];

export const DESTINATIONS = [
  `Amsterdam`, `Geneva`, `Chamonix`,
];

const generateOffer = (type, name, price) => {
  return ({type, name, price});
};

export const OFFERS = [
  generateOffer(`taxi`, `Order Uber`, `20`),
  generateOffer(`flight`, `Add luggage`, `50`),
  generateOffer(`flight`, `Switch to comfort`, `80`),
  generateOffer(`flight`, `Add meal`, `15`),
  generateOffer(`flight`, `Choose seats`, `15`),
  generateOffer(`flight`, `Travel by train`, `40`),
  generateOffer(`drive`, `Rent a car`, `200`),
  generateOffer(`check-in`, `Add breakfast`, `50`),
  generateOffer(`sightseeing`, `Book tickets`, `40`),
  generateOffer(`sightseeing`, `Lunch in city`, `30`),
];

export const RANDOM_TEXT = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];
