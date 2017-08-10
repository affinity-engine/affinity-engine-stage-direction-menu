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
    'global',
    'component.stage',
    'prompt',
    'menu',
    'component.stage.direction.menu'
  ],

  _setup: cmd({ async: true, render: true }, function(choices, options = {}) {
    this.configure(assign({
      choices
    }, options));
  })
});
