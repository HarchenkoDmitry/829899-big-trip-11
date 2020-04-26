export const MONTH_NAMES = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

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
