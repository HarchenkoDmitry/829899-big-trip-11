import Controller from '../components/absctract/controller.js';
import MenuComponent from '../components/menu.js';
import {enumPosition} from '../utils/render.js';


export default class MenuController extends Controller {
  constructor(container, model) {
    super(container, model);
    this.place = enumPosition.AFTERBEGIN;

    this._model.pageChangeObservable.add(this.render);

    this._onPageChange = this._onPageChange.bind(this);
  }

  _onPageChange(value) {
    this._model.currentPage = value;
  }

  get viewComponent() {
    const viewComponent = new MenuComponent(this._model.currentPage);
    viewComponent.onPageChange(this._onPageChange);
    return viewComponent;
  }
}
