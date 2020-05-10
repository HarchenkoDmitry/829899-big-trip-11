export default class Observable {
  constructor() {
    this._handlers = [];
  }

  add(handler) {
    this._handlers.push(handler);
  }

  remove(handler) {
    this._handlers.filter((item) => item !== handler);
  }

  notify() {
    this._handlers.forEach((handler) => handler());
  }
}
