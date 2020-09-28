import {$} from '@core/helpers/DOMHelper';
import {Emitter} from '@core/Emitter';

class Excel {
  constructor(selector, options) {
    this.$page = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  createRoot() {
    const $root = $.create('div', 'spreadsheet');
    const componentOptions = {
      emitter: this.emitter,
    };
    this.components = this.components.map(Component => {
      const $node = $.create('div', Component.className || 'component');
      const component = new Component($node, componentOptions);
      // DEBUG
      // if (component.name) {
      //   window[`c${component.name}`] = component;
      // }
      $node.html(component.toHTML());
      $root.append($node);
      return component;
    });
    return $root;
  }

  render() {
    this.$page.append(this.createRoot());
    this.components.forEach(Component => {
      Component.init();
    });
  }
}

export default Excel;
