import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu';
import { DirectableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const { reads } = computed;

export default Component.extend(DirectableComponentMixin, {
  layout,

  hook: 'affinity_engine_stage_direction_menu',

  configuration: reads('direction.configuration'),
  animationLibrary: reads('configuration.animationLibrary'),
  transitionIn: reads('configuration.transitionIn'),
  transitionOut: reads('configuration.transitionOut'),
  transitions: reads('configuration.transitions'),

  actions: {
    onChoice(choice) {
      set(this, 'choice', choice);

      this.$().parents('.affinity-engine').trigger('focus');

      set(this, 'willTransitionOut', true);
    },

    didTransitionOut() {
      this.resolveAndDestroy(get(this, 'choice'));
    }
  }
});
