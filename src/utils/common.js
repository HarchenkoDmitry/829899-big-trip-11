import Moment from 'moment';

export const formatTime = (date) => {
  return date.format(`HH:MM`);
};

export const formatDate = (date) => {
  return date.format(`DD/MM/YY`);
};

export const dateDiff = (date1, date2) => {
  const date1AtMidnight = new Moment(date1.format(`YYYY-MM-DD`));
  const date2AtMidnight = new Moment(date2.format(`YYYY-MM-DD`));
  return date1AtMidnight.diff(date2AtMidnight, `days`);
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const capitalizeString = (string) => {
  return string.replace(/^\w/, (letter) => letter.toUpperCase());
};

export const getDateDifference = (date1, date2) => {
  const diff = Math.floor(Math.abs(date2 - date1) / 1000 / 60);
  let numberOfMinutes = diff % 60;
  let numberOfHours = Math.floor(diff / 60 % 24);
  let numberOfDays = Math.floor(diff / 60 / 24);

  let res = ``;

  if (numberOfDays > 0) {
    res += castTimeFormat(numberOfDays) + `D `;
  }
  if (numberOfHours > 0) {
    res += castTimeFormat(numberOfHours) + `H `;
  }
  if (numberOfMinutes > 0) {
    res += castTimeFormat(numberOfMinutes) + `M `;
  }

  return res.trim();
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
