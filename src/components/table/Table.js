import Component from '@core/Component';
import {createTable} from '@/components/table/table.template';
import {shouldResize} from './table.helpers';
import tableResize from './table.resize';

export default class Table extends Component {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
    this.tableClassName = 'spreadsheet__table';
  }
  static className = 'table__wrapper';

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
    }
  }
}
