const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_UP = 38;
const ARROW_DOWN = 40;
const SELECTED = 'selected';

export default class TableSelector {
  constructor() {
    this.group = [];
    this.$current = null;
  }

  select($element) {
    this.resetSelected();
    this.group.push($element);
    this.$current = $element;
    this.$current.addClass(SELECTED);
  }

  selectGroup($group = []) {
    this.resetSelected();
    this.group = $group;
    this.group.forEach($cell => $cell.addClass(SELECTED));
  }

  resetSelected() {
    this.group.forEach(($el) => {
      $el.removeClass(SELECTED);
    });
    this.group = [];
  }

  /**
   * @method moveSelect
   * @param {DOMHelper} $element
   * @param {string} keyCode
   */
  moveSelect($element, keyCode) {
    switch (keyCode) {
      case ARROW_LEFT:
        this.resetSelected();
        this.select($element.previousSibling());
        break;
      case ARROW_RIGHT:
        this.resetSelected();
        this.nextCell($element.nextSibling());
        break;
      case ARROW_UP:
        break;
      case ARROW_DOWN:
        break;
    }
  }

  nextCell($el) {
    this.select($el);
    $el.focus();
  }
}
