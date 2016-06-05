import Ember from 'ember';
import layout from '../templates/components/ember-theater-director-direction-menu-option-button';

const {
  Component,
  get,
  on
} = Ember;

export default Component.extend({
  layout,

  classNameBindings: ['choice.class'],
  classNames: ['et-menu-option'],
  tagName: 'button',

  handleAction: on('click', 'submit', function() {
    if (get(this, 'choice.inputable')) {
      this.attrs.toggleInput();
    } else {
      this.attrs.choose();
    }
  })
});
