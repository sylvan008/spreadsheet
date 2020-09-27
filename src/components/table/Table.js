import Component from '@core/Component';
import {createTable} from '@/components/table/table.template';
import {isCell, shouldResize} from './table.helpers';
import tableResize from './table.resize';
import {$} from '@core/helpers/DOMHelper';
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
        matrix(this.selector.$current, $target);
        console.log();
      } else {
        this.selector.select($target);
      }
    }
  }

  onKeydown(event) {
    if (isCell(event)) {
      this.selector.moveSelect($(event.target), event.keyCode);
    }
  }
}
