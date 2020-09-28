import Component from '@core/Component';

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
      listeners: ['input'],
      ...options,
    });
  }

  static className = 'formula__wrapper';

  onInput(event) {
    this.emitter.emit('updateFormula', event.target.innerText);
    console.log('Formula input: ', event.target.textContent);
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
