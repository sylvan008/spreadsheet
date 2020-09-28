import DOMListener from '@core/DOMListener';

export default class Component extends DOMListener {
  /**
   *
   * @param {DOMHelper} $root
   * @param {Object} [options]
   * @param {string} options.name - Component name.
   * @param {string[]} options.listeners - Array of event's names.
   */
  constructor($root, options = {}) {
    if (!$root) {
      throw new Error('rootClassname needed');
    }
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.prepare();
  }

  prepare() {}

  toHTML() {
    return ``;
  }
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }
}
