import Ember from 'ember';
import { keyDown } from 'ember-keyboard';

const {
  TextField,
  on
} = Ember;

export default TextField.extend({
  classNames: ['et-menu-input'],
  hook: 'menu_direction_option_input',

  didInsertElement(...args) {
    this._super(...args);

    this.$().focus();
  },

  focusOut(...args) {
    this._super(...args);

    this.attrs.toggleInput();
  },

  complete: on(keyDown('Enter'), function() {
    this.attrs.choose();
  })
});
