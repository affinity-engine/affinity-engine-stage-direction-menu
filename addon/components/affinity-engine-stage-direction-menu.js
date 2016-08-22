import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu';
import multiton from 'ember-multiton-service';
import { DirectableComponentMixin, TransitionableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  run,
  set
} = Ember;

const { computed: { alias } } = Ember;

const mixins = [
  DirectableComponentMixin,
  TransitionableComponentMixin
];

export default Component.extend(...mixins, {
  layout,

  classNames: ['ae-menu', 'ae-stage-direction-menu'],
  classNameBindings: ['customClassNames'],
  hook: 'affinity_engine_stage_direction_menu',

  config: multiton('affinity-engine/config', 'engineId'),

  transitionIn: alias('directable.transitionIn'),
  transitionOut: alias('directable.transitionOut'),
  customClassNames: alias('directable.customClassNames'),

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
