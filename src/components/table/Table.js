import Component from '@core/Component';
import {createTable} from '@/components/table/table.template';

export default class Table extends Component {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: [],
    });
  }
  static className = 'table__wrapper';

  toHTML() {
    return `
      <div class="spreadsheet__table">
        ${createTable(50)}
      </div>
    `;
  }
}
