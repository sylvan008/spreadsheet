const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

export default class TableSelector {
  constructor() {
    this.selected = [];
    this.$current = null;
  }

  select($element) {
    this.resetSelected();
    this.selected.push($element);
    this.$current = $element;
    $element.classList('selected');
  }

  selectAll() {}

  resetSelected() {
    this.selected.forEach(($el) => {
      $el.removeClass('selected');
    });
    this.selected = [];
    this.$current = null;
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
        console.log($element.previousSibling());
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
    console.log($el);
    this.select($el);
    $el.focus();
  }
}
