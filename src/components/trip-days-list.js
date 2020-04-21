import {createEventsListTemplate} from './events-list.js';
import {MONTH_NAMES} from '../const.js';

export const createTripDaysListTemplate = (routePoints) => {
  const days = [];
  routePoints.forEach((point) => {
    const date = new Date(point.timeStart);
    date.setHours(0, 0, 0, 0);
    const dateString = date.toLocaleDateString(`en`);
    if (!days.includes(dateString)) {
      days.push(dateString);
    }
  });

  const daysListElement = days.map((day, index) => {
    const date = new Date(day);

    const routePointsCurrentDay = routePoints.filter((point) => {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      return point.timeStart >= date && point.timeStart < nextDay;
    });

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index + 1}</span>
          <time class="day__date" datetime="2019-03-18">${MONTH_NAMES[date.getMonth()]} ${date.getDate()}</time>
        </div>

        ${createEventsListTemplate(routePointsCurrentDay, index + 1)}

      </li>`
    );
  }).join(`\n`);

  return (
    `<ul class="trip-days">
      ${daysListElement}
    </ul>`
  );
};
