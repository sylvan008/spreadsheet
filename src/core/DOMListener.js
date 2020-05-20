import {capitalize} from '@core/utils';

export default class DOMListener {
  /**
   *
   * @param {DOMHelper} $root
   * @param {string[]} listeners
   */
  constructor($root, listeners= []) {
    if (!$root) {
      throw new Error('No $root provided for DOMListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(
            `Method ${method} not implemented in ${this.name} Component!`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.of(listener, this[method]);
    });
  }
}

function getMethodName(listener) {
  return 'on' + capitalize(listener);
}
