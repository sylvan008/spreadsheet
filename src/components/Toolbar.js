import Component from '@core/Component';

/**
 * @class Toolbar
 * @extends Component
 * @param {DOMHelper} $root
 * @param {object} options
 */
class Toolbar extends Component {
  constructor($root, options) {
    super($root, {
      name: 'Tollbar',
      ...options,
    });
  }

  static className = 'toolbar__wrapper';

  toHTML() {
    return `
      <div class="spreadsheet__toolbar">
        <button class="btn">
          <i class="material-icons">format_bold</i>
        </button>
        <button class="btn">
          <i class="material-icons">format_italic</i>
        </button>
        <button class="btn">
          <i class="material-icons">strikethrough_s</i>
        </button>
        <button class="btn">
          <i class="material-icons">format_align_left</i>
        </button>
        <button class="btn">
          <i class="material-icons">format_align_center</i>
        </button>
        <button class="btn">
          <i class="material-icons">format_align_right</i>
        </button>
      </div>
    `;
  }
}

export default Toolbar;
