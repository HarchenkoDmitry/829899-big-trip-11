import SortComponent from '../components/sort.js';
import Controller from '../components/absctract/controller.js';


export default class SortController extends Controller {
  constructor(container, model) {
    super(container, model);

    this._model.sortChangeObservable.add(this.render);

    this._onSortChange = this._onSortChange.bind(this);
  }

  _onSortChange(value) {
    this._model.currentSort = value;
  }

  get viewComponent() {
    const viewComponent = new SortComponent(this.data);
    viewComponent.onSortChange(this._onSortChange);
    return viewComponent;
  }

  get data() {
    return this._model.currentSort;
  }
}
