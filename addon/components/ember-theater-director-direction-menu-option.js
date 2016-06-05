import Ember from 'ember';
import layout from '../templates/components/ember-theater-director-direction-menu-option';

const {
  Component,
  isPresent
} = Ember;

const { computed: { and } } = Ember;
const { run: { next } } = Ember;

export default Component.extend({
  layout: layout,

  classNameBindings: ['choice.classNames'],
  hook: 'menu_direction_option',

  isInput: and('choice.inputable', 'inputOpen'),

  actions: {
    choose(choice) {
      this.attrs.choose(choice);
    },

    toggleInput() {
      this.toggleProperty('inputOpen');

      next(() => {
        const button = this.$('button');

        if (isPresent(button)) {
          button.focus();
        }
      });
    }
  }
});
