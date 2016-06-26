import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu';
import multiton from 'ember-multiton-service';
import { deepConfigurable } from 'affinity-engine';
import { DirectableComponentMixin, TransitionableComponentMixin } from 'affinity-engine-stage';

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
  'config.attrs.stage.menu',
  'config.attrs.stage',
  'config.attrs.globals'
];

export default Component.extend(...mixins, {
  layout,

  hook: 'menu_direction',

  config: multiton('affinity-engine/config', 'engineId'),

  transitionIn: deepConfigurable(configurationTiers, 'transitionIn', 'transition'),
  transitionOut: deepConfigurable(configurationTiers, 'transitionOut'),

  didInsertElement(...args) {
    this._super(...args);

    this.executeTransitionIn();
  },

  actions: {
    choose(choice) {
      set(this, 'directable.direction.result', choice);

      this.$().parents('.affinity-engine').trigger('focus');

      this.executeTransitionOut().then(() => {
        run(() => {
          this.resolveAndDestroy();
        });
      });
    }
  }
});
