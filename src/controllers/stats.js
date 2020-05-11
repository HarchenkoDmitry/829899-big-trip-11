import StatsComponent from '../components/stats.js';
import Controller from '../components/absctract/controller.js';
import {enumPosition} from '../utils/render.js';


export default class StatsController extends Controller {
  constructor(container, model) {
    super(container, model);
    this.place = enumPosition.AFTEREND;

    this._viewComponent = new StatsComponent();
  }

  get viewComponent() {
    return this._viewComponent;
  }

  get data() {
    return this._model.routePoints;
  }

  render() {
    super.render();
    this._viewComponent.render(this._model.routePoints);
  }
}
