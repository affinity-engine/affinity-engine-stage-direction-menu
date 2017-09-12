import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu';
import { AnimatableMixin } from 'affinity-engine';
import { DirectableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const { reads } = computed;

export default Component.extend(AnimatableMixin, DirectableComponentMixin, {
  layout,

  hook: 'affinity_engine_stage_direction_menu',
  mediaElementSelector: '.ae-stage',
  classNames: ['ae-hidden'],

  configuration: reads('direction.configuration.attrs'),
  animator: reads('configuration.animator'),
  transitionIn: reads('configuration.transitionIn'),
  transitionOut: reads('configuration.transitionOut'),
  transitions: reads('configuration.transitions'),

  didTransitionOut() {
    this.resolveAndDestroy(get(this, 'choice'));
  },

  actions: {
    onChoice(choice) {
      set(this, 'choice', choice);

      this.$().parents('.affinity-engine').trigger('focus');

      set(this, 'willTransitionOut', true);
    }
  }
});
