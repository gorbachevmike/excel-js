import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" data-type="input" contenteditable spellcheck="false"></div>
    `;
  }
  init() {
    super.init();
    const $formula = this.$root.find('[data-type="input"]');
    this.$on('table:select', ($cell) => {
      $formula.text($cell.text());
    });
    this.$on('table:input', ($cell) => {
      $formula.text($cell.text());
    });
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }
}
