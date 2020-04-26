export const MONTH_NAMES = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

export const TRANSFER_TYPE_NAME = `transfer`;
export const ACTIVITY_TYPE_NAME = `activity`;

const ICON_PATH = `img/icons/`;

export const ROUTE_POINTS_TYPES = {
  'check-in': {
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Check-in in`,
    iconPath: ICON_PATH + `check-in.png`,
  },
  'sightseeing': {
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Sightseeing in`,
    iconPath: ICON_PATH + `sightseeing.png`,
  },
  'restaurant': {
    type: ACTIVITY_TYPE_NAME,
    supportingText: `Restaurant in`,
    iconPath: ICON_PATH + `restaurant.png`,
  },
  'taxi': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Taxi in`,
    iconPath: ICON_PATH + `taxi.png`,
  },
  'bus': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Bus in`,
    iconPath: ICON_PATH + `bus.png`,
  },
  'train': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Train in`,
    iconPath: ICON_PATH + `train.png`,
  },
  'ship': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Ship in`,
    iconPath: ICON_PATH + `ship.png`,
  },
  'transport': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Transport in`,
    iconPath: ICON_PATH + `transport.png`,
  },
  'drive': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Drive in`,
    iconPath: ICON_PATH + `drive.png`,
  },
  'flight': {
    type: TRANSFER_TYPE_NAME,
    supportingText: `Flight in`,
    iconPath: ICON_PATH + `flight.png`,
  },
};

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
