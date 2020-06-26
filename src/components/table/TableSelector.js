export default class TableSelector {
  constructor() {
    this.selected = [];
  }

  select($element) {
    this.resetSelected();
    this.selected.push($element);
    $element.classList('selected');
  }

  selectAll() {}

  resetSelected() {
    this.selected.forEach(($el) => {
      $el.removeClass('selected');
    });
    this.selected = [];
  }
}
