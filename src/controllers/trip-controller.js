import FiltersComponent from '../components/filters.js';
import SortComponent from '../components/sort.js';
import TripDaysListComponent from '../components/trip-days-list.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import TripInfoComponent from '../components/trip-info.js';
import NoEventsComponent from '../components/event/no-events.js';

export class TripController {
  constructor(trip, tripInfoContainerElement, controlsContainerElement, eventsContainerElement) {
    this._trip = trip;
    this._tripInfoContainerElement = tripInfoContainerElement;
    this._controlsContainerElement = controlsContainerElement;
    this._eventsContainerElement = eventsContainerElement;

    this._tripInfoComponent = new TripInfoComponent(this._trip.route, this._trip.duration, this._trip.totalPrice);
    this._filtersComponent = new FiltersComponent(this._trip.currentFilter, this._trip.arrDisabledFilters);
    this._sortComponent = new SortComponent(this._trip.currentSort);
    this._tripDaysListComponent = new TripDaysListComponent(this._trip.convertedRoutePoints, this._trip.currentSort);
    this._noEventsComponent = new NoEventsComponent();

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
  }

  onChangeFilter(value) {
    this._trip.currentFilter = value;
    this._tripDaysListComponent.routePoints = this._trip.convertedRoutePoints;
    this.renderEvents();
  }

  onChangeSort(value) {
    this._trip.currentSort = value;
    this._tripDaysListComponent.routePoints = this._trip.convertedRoutePoints;
    this._tripDaysListComponent.currentSort = this._trip.currentSort;
    this._sortComponent.currentSort = this._trip.currentSort;
    this.renderSort();
    this.renderEvents();
  }

  renderTripInfo() {
    remove(this._tripInfoComponent);
    render(this._tripInfoContainerElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  renderFilter() {
    remove(this._filtersComponent);
    this._filtersComponent.setFilterChangeHandler(this.onChangeFilter);
    render(this._controlsContainerElement, this._filtersComponent);
  }

  renderSort() {
    remove(this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this.onChangeSort);
    render(this._eventsContainerElement, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  renderEvents() {
    remove(this._tripDaysListComponent);
    render(this._eventsContainerElement, this._tripDaysListComponent);
  }

  renderNoEvents() {
    remove(this._noEventsComponent);
    render(this._eventsContainerElement, this._noEventsComponent);
  }

  render() {
    this.renderTripInfo();
    this.renderFilter();

    if (this._trip.convertedRoutePoints.length > 0) {
      this.renderSort();
      this.renderEvents();
    } else {
      this.renderNoEvents();
    }
  }
}
