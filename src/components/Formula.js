import Component from '@core/Component';

class Formula extends Component {
  /**
   *
   * @param {DOMHelper} $root
   */
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  static className = 'formula__wrapper';

  onInput(event) {
    console.log('Formula input: ', event.target.textContent);
  }

  onClick(event) {
    console.log('Formula click: ', event);
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
