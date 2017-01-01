import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu';
import { DirectableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const { alias } = computed;

export default Component.extend(DirectableComponentMixin, {
  layout,

  hook: 'affinity_engine_stage_direction_menu',

  transitions: computed(() => Ember.A()),

  animationLibrary: alias('directable.animationLibrary'),
  transitionIn: alias('directable.transitionIn'),
  transitionOut: alias('directable.transitionOut'),

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
