import Component from '@core/Component';
import {$} from '@core/helpers/DOMHelper';
import {createTable} from '@/components/table/table.template';
import tableResize from './table.resize';
import {isCell, shouldResize, matrix} from './table.helpers';
import TableSelector from '@/components/table/TableSelector';

export default class Table extends Component {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
    });
    this.tableClassName = 'spreadsheet__table';
  }
  static className = 'table__wrapper';

  prepare() {
    this.selector = new TableSelector();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selector.select($cell);
  }

  toHTML() {
    return `
      <div class="${this.tableClassName}">
        ${createTable(50)}
      </div>
    `;
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const ids = matrix(this.selector.$current, $target);
        const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
        this.selector.selectGroup($cells);
      } else {
        this.selector.select($target);
      }
    }
  }

  onKeydown(event) {
    if (isCell(event)) { // TODO fires when any key is pressed
      this.selector.moveSelect($(event.target), event.keyCode);
    }
  }
}
