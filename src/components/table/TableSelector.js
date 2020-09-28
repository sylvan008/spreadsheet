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
    this.$current.focus().addClass(SELECTED);
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
}
