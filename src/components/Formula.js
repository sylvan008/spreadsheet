import Component from '@core/Component';
import {keysKeyboard, events} from '@core/keys';

class Formula extends Component {
  /**
   * @class Formula
   * @extends Component
   * @param {DOMHelper} $root
   * @param {object} options
   */
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
    this._updateFormulaInput = this._updateFormulaInput.bind(this);
    this.init();
  }

  static className = 'formula__wrapper';

  init() {
    super.init();
    this.inputField = this.$root.find('[contenteditable]');
    this.$on(events.CELL_INPUT, this._updateFormulaInput);
    this.$on(events.CELL_FOCUSED, this._updateFormulaInput);
  }

  onInput(event) {
    this.$emit('updateFormula', event.target.textContent);
  }

  onKeydown(event) {
    this._isEnterKeydown(event);
  }

  _isEnterKeydown(event) {
    if (event.key === keysKeyboard.ENTER) {
      event.preventDefault();
      this.$emit(events.FORMULA_ENTER);
    }
  }
  _updateFormulaInput(text = '') {
    this.inputField.text(text);
  }

  toHTML() {
    return `
      <div class="spreadsheet__formula">
        <div class="formula__label">fx</div>
        <div
          class="formula__input"
          role="textbox"
          tabindex="0"
          contenteditable
          spellcheck="false"></div>
      </div>      
    `;
  }
}

export default Formula;
