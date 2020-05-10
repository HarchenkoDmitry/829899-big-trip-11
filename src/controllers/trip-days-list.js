import TripDaysListComponent from '../components/trip-days-list.js';
import Controller from '../components/absctract/controller.js';
import {sort as sortType} from '../consts/sort.js';
import {dateDiff} from '../utils/common.js';
import RoutePointController from './route-point.js';
import TripDaysItemComponent from '../components/trip-days-item.js';
import RoutePointsListComponent from '../components/event/events-list.js';
import RoutePointWrapComponent from '../components/event/event-wrap.js';
import {render} from '../utils/render.js';

export default class TripDaysListController extends Controller {
  constructor(container, model) {
    super(container, model);

    this._model.filterChangeObservable.add(this.render);
    this._model.sortChangeObservable.add(this.render);
    this._model.routePointsDataChangeObservable.add(this.render);
  }

  get viewComponent() {
    const tripDaysListComponent = new TripDaysListComponent();
    this.data.forEach((day) => {
      const tripDaysItemComponent = new TripDaysItemComponent(day);
      const routePointsListComponent = new RoutePointsListComponent();

      day.routePoints.forEach((routePoint) => {
        const routePointWrapComponent = new RoutePointWrapComponent();
        render(routePointsListComponent.element, routePointWrapComponent);

        const routePointController = new RoutePointController(routePointWrapComponent.element, this._model, routePoint);
        routePointController.render();
      });

      render(tripDaysItemComponent.element, routePointsListComponent);
      render(tripDaysListComponent.element, tripDaysItemComponent);
    });

    return tripDaysListComponent;
  }

  get data() {
    const arrRoutePointsListsByDay = [];
    const routePoints = this._model.routePoints;

    if (routePoints.length > 0) {
      if (this._model.currentSort === sortType.EVENT) {

        let currentDayRoutePoints = {
          dayNumber: 1,
          date: routePoints[0].timeStart,
          routePoints: [],
        };

        routePoints.forEach((point) => {
          if (currentDayRoutePoints.date.format(`YYYY-MM-DD`) === point.timeStart.format(`YYYY-MM-DD`)) {
            currentDayRoutePoints.routePoints.push(point);
          } else {
            arrRoutePointsListsByDay.push(currentDayRoutePoints);

            const pastDaysCount = dateDiff(point.timeStart, currentDayRoutePoints.date);

            currentDayRoutePoints = {
              dayNumber: currentDayRoutePoints.dayNumber + pastDaysCount,
              date: point.timeStart,
              routePoints: [point],
            };
          }
        });
        arrRoutePointsListsByDay.push(currentDayRoutePoints);
      } else {
        arrRoutePointsListsByDay.push({
          dayNumber: null,
          date: null,
          routePoints,
        });
      }
    }

    return arrRoutePointsListsByDay;
  }
}
