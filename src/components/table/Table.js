import Component from '@core/Component';
import {$} from '@core/helpers/DOMHelper';
import {createTable} from '@/components/table/table.template';
import tableResize from './table.resize';
import {isCell, shouldResize, matrix, nextSelector} from './table.helpers';
import TableSelector from '@/components/table/TableSelector';
import {keysKeyboard} from '@core/keys';

/**
 * @class Table
 * @extends Component
 * @param {DOMHelper} $root
 * @param {object} options
 */
export default class Table extends Component {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
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

    this.emitter.subscribe(
        'updateFormula',
        (data) => this.selector.$current.text(data)
    );
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
    const keys = [
      keysKeyboard.ENTER,
      keysKeyboard.TAB,
      keysKeyboard.ARROW_UP,
      keysKeyboard.ARROW_RIGHT,
      keysKeyboard.ARROW_DOWN,
      keysKeyboard.ARROW_LEFT,
    ];
    const {key} = event;
    if (isCell(event)) { // TODO fires when any key is pressed
      if (keys.includes(key) && !event.shiftKey) { // TODO tab + shift
        event.preventDefault();
        const id = this.selector.$current.dataId(true);
        const $nextCell = this.$root.find(nextSelector(key, id));
        this.selector.select($nextCell);
      }
    }
  }
}
