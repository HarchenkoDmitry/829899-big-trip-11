import EventComponent from '../components/event/event.js';
import EventEditComponent from '../components/event/event-edit.js';
import Controller from '../components/absctract/controller.js';
import {mode} from '../models/route-point.js';
import {ROUTE_POINTS_TYPES} from '../consts/route-poinst.js';
import _ from 'lodash';
import Moment from 'moment';
import {api} from '../main.js';


export default class RoutePointController extends Controller {
  constructor(container, model, routePoint) {
    super(container, model);

    this._routePoint = routePoint;
    this._routePoint.isSaving = false;
    this._routePoint.isDeleting = false;
    this._copyRoutePoint = null;

    this._viewComponent = null;

    this._routePoint.onDataChangeObservable.add(this.render);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
    this._onTimeStartChange = this._onTimeStartChange.bind(this);
    this._onTimeEndChange = this._onTimeEndChange.bind(this);
    this._onPriceChange = this._onPriceChange.bind(this);
    this._onOfferChange = this._onOfferChange.bind(this);
    this._onSubmitForm = this._onSubmitForm.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  get viewComponent() {
    switch (this._routePoint.mode) {

      case mode.DEFAULT:
        this._copyRoutePoint = null;
        this._viewComponent = new EventComponent(this._routePoint);
        break;

      case mode.EDIT:
        document.addEventListener(`keydown`, this._onEscKeyDown);
        if (this._copyRoutePoint === null) {
          this._copyRoutePoint = _.cloneDeep(this._routePoint);
        }
        this._viewComponent = new EventEditComponent(this._copyRoutePoint);
        this._addHandlers(this._viewComponent);
        break;

      case mode.ADD:
        document.addEventListener(`keydown`, this._onEscKeyDown);
        if (this._copyRoutePoint === null) {
          this._copyRoutePoint = _.cloneDeep(this._routePoint);
        }
        this._viewComponent = new EventEditComponent(this._copyRoutePoint);
        this._addHandlers(this._viewComponent);

    }
    this._viewComponent.onModeChange(this._onModeChange);
    return this._viewComponent;
  }

  _addHandlers(component) {
    component.onFavoriteChange(this._onFavoriteChange);
    component.onTypeChange(this._onTypeChange);
    component.onDestinationChange(this._onDestinationChange);
    component.onTimeStartChange(this._onTimeStartChange);
    component.onTimeEndChange(this._onTimeEndChange);
    component.onPriceChange(this._onPriceChange);
    component.onOfferChange(this._onOfferChange);
    component.onSubmitForm(this._onSubmitForm);
    component.onDelete(this._onDelete);
  }

  _onModeChange(value) {
    if (value !== mode.DEFAULT) {
      this._model.routePoints.forEach((point) => {
        if (point.mode !== mode.DEFAULT) {
          point.mode = mode.DEFAULT;
        }
      });
    }

    this._routePoint.mode = value;
    this._model.routePointsDataChangeObservable.notify();
  }

  _onFavoriteChange(value) {
    this._routePoint.isFavorite = Boolean(value);
    this._copyRoutePoint.isFavorite = Boolean(value);
  }

  _onTypeChange(type) {
    this._copyRoutePoint.type = ROUTE_POINTS_TYPES.find((typeItem) => typeItem.name === type);
    this.render();
  }

  _onDestinationChange(destination) {
    this._copyRoutePoint.destination = destination;
    this._routePoint.onDataChangeObservable.notify();
  }

  _onPriceChange(price) {
    this._copyRoutePoint.price = Number(price);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._routePoint.mode = mode.DEFAULT;
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onTimeStartChange(timeStart) {
    this._copyRoutePoint.timeStart = new Moment(timeStart, `DD/MM/YY HH:mm`);
  }

  _onTimeEndChange(timeEnd) {
    this._copyRoutePoint.timeEnd = new Moment(timeEnd, `DD/MM/YY HH:mm`);
  }

  _onOfferChange(offer, isChecked) {
    if (isChecked) {
      this._copyRoutePoint.offers.push(offer);
    } else {
      this._copyRoutePoint.offers = this._copyRoutePoint.offers.filter((offersItem) => offersItem.name !== offer.name);
    }
  }

  _onSubmitForm() {
    this._copyRoutePoint.isSaving = true;
    this._routePoint.onDataChangeObservable.notify();
    api.updatePoint(this._routePoint.id, this._copyRoutePoint)
      .then((response) => {
        this._routePoint = Object.assign(this._routePoint, response);
        this._routePoint.mode = mode.DEFAULT;
        this._routePoint.isSaving = false;
        this._model.routePointsDataChangeObservable.notify();
      });
  }

  _onDelete() {
    this._copyRoutePoint.isDeleting = true;
    this._routePoint.onDataChangeObservable.notify();
    api.deletePoint(this._routePoint.id)
      .then((response) => {
        if (response.ok) {
          this._model.deleteRoutePoint(this._routePoint.id);
        }
      });
  }
}
