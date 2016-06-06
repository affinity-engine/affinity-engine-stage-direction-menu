import Ember from 'ember';
import layout from '../templates/components/ember-theater-director-direction-menu-option-button';

const {
  Component,
  computed,
  get,
  on
} = Ember;

export default Component.extend({
  layout,

  classNameBindings: ['choice.class'],
  classNames: ['et-menu-option'],
  hook: 'menu_direction_option_button',
  tagName: 'button',

  iconComponent: computed('choice.iconFamily', {
    get() {
      return get(this, 'choice.iconFamily') || get(this, 'iconFamily');
    }
  }),

  handleAction: on('click', 'submit', function() {
    if (get(this, 'choice.inputable')) {
      this.attrs.toggleInput();
    } else {
      this.attrs.choose();
    }
  })
});
