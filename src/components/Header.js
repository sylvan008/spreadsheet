import Component from '@core/Component';

/**
 * @class Header
 * @extends Component
 * @param {DOMHelper} $root
 * @param {object} options
 */
class Header extends Component {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  static className = 'header__wrapper';

  toHTML() {
    return `
      <div class="spreadsheet__header">
        <div class="header__filename">
          <input type="text" value="Новая таблица">
        </div>
        <div class="header__control">
          <button class="btn">
            <i class="material-icons">delete</i>
          </button>
          <button class="btn">
            <i class="material-icons">exit_to_app</i>
          </button>
        </div>
      </div>
    `;
  }
}
export default Header;
