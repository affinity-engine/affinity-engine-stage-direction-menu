import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu';
import { DirectableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  computed,
  set
} = Ember;

const { alias } = computed;

export default Component.extend(DirectableComponentMixin, {
  layout,

  classNames: ['ae-menu', 'ae-stage-direction-menu'],
  classNameBindings: ['customClassNames'],
  hook: 'affinity_engine_stage_direction_menu',

  transitions: computed(() => Ember.A()),

  animationLibrary: alias('directable.animationLibrary'),
  customClassNames: alias('directable.customClassNames'),
  transitionIn: alias('directable.transitionIn'),
  transitionOut: alias('directable.transitionOut'),

  actions: {
    onChoice(choice) {
      set(this, 'directable.direction.result', choice);

      this.$().parents('.affinity-engine').trigger('focus');

      set(this, 'willTransitionOut', true);
    },

    didTransitionOut() {
      this.resolveAndDestroy();
    }
  }
});
