import Ember from 'ember';
import { Direction, cmd } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  assign
} = Ember;

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-menu',
  layer: 'engine.prompt.menu',

  config: multiton('affinity-engine/config', 'engineId'),
  fixtureStore: multiton('affinity-engine/fixture-store', 'engineId'),

  _configurationTiers: [
    'component.stage.direction.menu',
    'menu',
    'component.stage.direction.prompt',
    'prompt',
    'component.stage.direction.every',
    'component.stage.every',
    'children'
  ],

  _setup: cmd({ async: true, render: true }, function(choices, options = {}) {
    this.configure(assign({
      choices,
      transitions: Ember.A()
    }, options));
  }),

  transition: cmd({ async: true, render: true }, function(options = {}) {
    this.getConfiguration('transitions').pushObject(options);
  })
});
