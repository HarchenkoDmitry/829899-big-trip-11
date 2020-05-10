import SortController from './sort.js';
import TripDaysListController from './trip-days-list.js';
import NoEventsComponent from '../components/event/no-events.js';
import {remove, render} from '../utils/render.js';

export default class SitePageController {
  constructor(container, model) {
    this._model = model;
    this._container = container;

    this.sortController = new SortController(this._container, this._model);
    this.routePointsListController = new TripDaysListController(this._container, this._model);

    this._noEventsComponent = new NoEventsComponent();

    this.render = this.render.bind(this);

    this._model.routePointsDataChangeObservable.add(this.render);
  }

  renderNoEvents() {
    render(this._container, this._noEventsComponent);
  }

  render() {
    remove(this._noEventsComponent);
    if (this._model.routePoints.length > 0) {
      this.sortController.render();
      this.routePointsListController.render();
    } else {
      this.renderNoEvents();
    }
  }
}
