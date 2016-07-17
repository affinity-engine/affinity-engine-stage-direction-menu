import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu';
import multiton from 'ember-multiton-service';
import { classNamesConfigurable, deepConfigurable } from 'affinity-engine';
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

  classNames: ['ae-menu', 'ae-menu-direction'],
  classNameBindings: ['customClassNames'],
  hook: 'menu_direction',

  config: multiton('affinity-engine/config', 'engineId'),

  transitionIn: deepConfigurable(configurationTiers, 'transitionIn', 'transition'),
  transitionOut: deepConfigurable(configurationTiers, 'transitionOut'),
  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),

  didInsertElement(...args) {
    this._super(...args);

    this.executeTransitionIn();
  },

  actions: {
    onChoice(choice) {
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
