import Component from '@core/Component';
import {createTable} from '@/components/table/table.template';
import {includesClass, shouldResize} from './table.helpers';
import tableResize from './table.resize';
import {$} from '@core/helpers/DOMHelper';
import TableSelector from '@/components/table/TableSelector';

export default class Table extends Component {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
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
    } else if (includesClass(event, 'cell')) {
      this.selector.select($(event.target));
    }
  }
}
