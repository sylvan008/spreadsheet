class DOMHelper {
  /**
   * @param {string|HTMLElement} selectorOrNode
   */
  constructor(selectorOrNode) {
    this.$nativeElement = typeof selectorOrNode === 'string'
      ? document.querySelector(selectorOrNode)
      : selectorOrNode;
  }

  /**
   * @method append
   * @param {DOMHelper|HTMLElement} node
   * @return {DOMHelper}
   */
  append(node) {
    if (node instanceof DOMHelper) {
      node = node.$nativeElement;
    }
    this.$nativeElement.append(node);
    return this;
  }

  /**
   * @method classList
   * @param {string} classList
   * @return {DOMHelper|string}
   */
  classList(classList) {
    if (classList) {
      this.$nativeElement.classList.add(classList);
      return this;
    }
    return this.$nativeElement.classList;
  }

  /**
   * @method clear
   * @return {DOMHelper}
   */
  clear() {
    this.html('');
    return this;
  }

  /**
   * @method html
   * @param {string} html
   * @return {string|DOMHelper}
   */
  html(html) {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      return this;
    }
    return this.$nativeElement.outerHTML.trim();
  }

  /**
   * @method on
   * @param {string} eventName
   * @param {function} callback
   * @return {DOMHelper}
   */
  on(eventName, callback) {
    this.$nativeElement.addEventListener(eventName, callback);
    return this;
  }

  /**
   * @method of
   * @param {string} event
   * @param {function} callback
   * @return {DOMHelper}
   */
  of(event, callback) {
    this.$nativeElement.removeEventListener(event, callback);
    return this;
  }
}

/**
 * @function
 * @param {string} selectorOrNode - selector or html node
 * @return {DOMHelper}
 */
export function $(selectorOrNode) {
  return new DOMHelper(selectorOrNode);
}

/**
 * @method create
 * @param {string} tagName
 * @param {string} classes
 * @return {DOMHelper}
 */
$.create = (tagName, classes = '') => {
  const $element = document.createElement(tagName);
  if (classes) {
    $element.classList.add(classes);
  }
  return $($element);
};
