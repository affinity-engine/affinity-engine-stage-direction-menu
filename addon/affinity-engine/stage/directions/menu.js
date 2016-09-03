import Ember from 'ember';
import { configurable, classNamesConfigurable, deepConfigurable } from 'affinity-engine';
import { Direction, cmd } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  assign,
  computed,
  get,
  set
} = Ember;

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-menu',
  layer: 'engine.prompt.menu',

  config: multiton('affinity-engine/config', 'engineId'),
  fixtureStore: multiton('affinity-engine/fixture-store', 'engineId'),

  _configurationTiers: [
    'attrs',
    'links.attrs',
    'links.fixtures.menu',
    'config.attrs.component.stage.direction.menu',
    'config.attrs.component.stage',
    'config.attrs'
  ],

  _directableDefinition: computed('_configurationTiers', {
    get() {
      const configurationTiers = get(this, '_configurationTiers');

      return {
        choices: configurable(configurationTiers, 'choices'),
        columns: configurable(configurationTiers, 'menuColumns'),
        customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
        header: configurable(configurationTiers, 'header'),
        iconFamily: configurable(configurationTiers, 'iconFamily'),
        keyboardPriority: configurable(configurationTiers, 'keyboardPriority'),
        acceptKeys: configurable(configurationTiers, 'keys.accept'),
        cancelKeys: configurable(configurationTiers, 'keys.escape'),
        moveDownKeys: configurable(configurationTiers, 'keys.moveDown'),
        moveLeftKeys: configurable(configurationTiers, 'keys.moveLeft'),
        moveRightKeys: configurable(configurationTiers, 'keys.moveRight'),
        moveUpKeys: configurable(configurationTiers, 'keys.moveUp'),
        transitionIn: deepConfigurable(configurationTiers, 'transitionIn', 'transition'),
        transitionOut: deepConfigurable(configurationTiers, 'transitionOut')
      }
    }
  }),

  _setup: cmd({ async: true, directable: true }, function(choices) {
    set(this, 'attrs.choices', choices);
  }),

  classNames: cmd(function(classNames) {
    set(this, 'attrs.classNames', classNames);
  }),

  header: cmd(function(header) {
    set(this, 'attrs.header', header);
  }),

  keyboardPriority: cmd(function(keyboardPriority) {
    set(this, 'attrs.keyboardPriority', keyboardPriority);
  }),

  keys: cmd(function(keys) {
    set(this, 'attrs.keys', keys);
  }),

  transitionIn: cmd(function(effect, duration, options = {}) {
    set(this, 'attrs.transitionIn', assign({ duration, effect }, options));
  }),

  transitionOut: cmd(function(effect, duration, options = {}) {
    set(this, 'attrs.transitionOut', assign({ duration, effect }, options));
  })
});
