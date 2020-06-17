import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.store = options.store;
    this.prepare();
  }
  // Настройка компонента до init
  prepare() {}
  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }
  // Уведомляет слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }
  $dispatch(action) {
    this.store.dispatch(action);
  }
  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn);
  // }
  storeChanged() {}
  isWatching(key) {
    return this.subscribe.includes(key);
  }
  // Инициализация компонента
  init() {
    this.initDOMListeners();
  }
  // Удаляем компоненет
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
