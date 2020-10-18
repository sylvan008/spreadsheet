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
   * @return {DOMStringMap}
   */
  get data() {
    return this.$nativeElement.dataset;
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

  attr(attributeName, value) {
    if (arguments.length === 1) {
      return this.$nativeElement.getAttribute(attributeName);
    } else if (arguments.length === 2) {
      this.$nativeElement.setAttribute(attributeName, value);
    }

    return undefined;
  }

  blur() {
    this.$nativeElement.blur();
  }

  /**
   * @method children
   * @param {string} selector
   * @return {HTMLElement[]}
   */
  children(selector = '') {
    if (selector) {
      return [...this.$nativeElement.querySelectorAll(selector)];
    }
    return [...this.$nativeElement.children];
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
   * @method addClass
   * @param {string} className
   */
  addClass(className) {
    this.$nativeElement.classList.add(className);
  }

  /**
   * @method closest
   * @param {string} selector
   * @return {DOMHelper}
   */
  closest(selector) {
    return $(this.$nativeElement.closest(selector));
  }


  /**
   * @method css
   * @param {object} styles
   * @param {string} styles.key
   */
  css(styles = {}) {
    Object.assign(this.$nativeElement.style, styles);
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
   * @method find
   * @param {string} selector
   * @return {DOMHelper|HTMLElement}
   */
  find(selector) {
    return $(this.$nativeElement.querySelector(selector));
  }

  /**
   * @method findAll
   * @param {string} selector
   * @return {HTMLElement[]}
   */
  findAll(selector) {
    return [...this.$nativeElement.querySelectorAll(selector)];
  }

  focus() {
    this.$nativeElement.focus();
    return this;
  }

  /**
   * @method getCoord
   * @return {Object} Html block coordinates
   */
  getCoord() {
    return this.$nativeElement.getBoundingClientRect();
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
   * @method dataId
   * @param {boolean} parse
   * @return {string|{col: number, row: number}}
   */
  dataId(parse = false) {
    const {id} = this.$nativeElement.dataset;
    if (parse) {
      const [row, col] = id.split(':');
      return {
        row: +row,
        col: +col,
      };
    }
    return id;
  }

  /**
   * @method index
   * @param {string|HTMLElement} prop
   * @return {number}
   */
  index(prop = this.$nativeElement) {
    const children = [...prop.parentNode.children];
    for (let i = 0; i < children.length; i++) {
      if ((children[i].nodeType === Node.ELEMENT_NODE)
        && (children[i] === prop)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * @method nextSibling
   * @return {DOMHelper|HTMLElement}
   */
  nextSibling() {
    return $(this.$nativeElement.nextElementSibling);
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

  /**
   * @method previousSibling
   * @return {DOMHelper|HTMLElement}
   */
  previousSibling() {
    return $(this.$nativeElement.previousElementSibling);
  }

  /**
   * @method removeClass
   * @param {string} className
   */
  removeClass(className) {
    this.$nativeElement.classList.remove(className);
  }

  /**
   * @method text
   * @param {string} text
   * @return {string}
   */
  text(text) {
    if (typeof text === 'string') {
      this.$nativeElement.textContent = text;
      return this;
    }
    if (this.$nativeElement.tagName.toLocaleLowerCase() === 'input') {
      return this.$nativeElement.value().trim();
    }
    return this.$nativeElement.textContent.trim();
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
