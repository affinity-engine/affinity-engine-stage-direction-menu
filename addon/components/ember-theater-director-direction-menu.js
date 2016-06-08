import Ember from 'ember';
import layout from '../templates/components/ember-theater-director-direction-menu';
import multiton from 'ember-multiton-service';
import { deepConfigurable } from 'ember-theater';
import { DirectableComponentMixin, TransitionableComponentMixin } from 'ember-theater-director';

const {
  Component,
  run,
  set
} = Ember;

const mixins = [
  DirectableComponentMixin,
  TransitionableComponentMixin
];

const configurationTiers = [
  'directable.attrs',
  'config.attrs.director.menu',
  'config.attrs.director',
  'config.attrs.globals'
];

export default Component.extend(...mixins, {
  layout,

  hook: 'menu_direction',

  config: multiton('ember-theater/config', 'theaterId'),

  transitionIn: deepConfigurable(configurationTiers, 'transitionIn', 'transition'),
  transitionOut: deepConfigurable(configurationTiers, 'transitionOut'),

  didInsertElement(...args) {
    this._super(...args);

    this.executeTransitionIn();
  },

  actions: {
    choose(choice) {
      set(this, 'directable.direction.result', choice);

      this.$().parents('.ember-theater').trigger('focus');

      this.executeTransitionOut().then(() => {
        run(() => {
          this.resolveAndDestroy();
        });
      });
    }
  }
});
