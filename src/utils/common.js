export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

export const formatDate = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth() + 1);
  const year = date.getFullYear().toString().split(``).slice(-2).join(``);
  return `${day}/${month}/${year}`;
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
