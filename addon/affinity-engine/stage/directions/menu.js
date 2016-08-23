import Ember from 'ember';
import { configurable, classNamesConfigurable, deepConfigurable } from 'affinity-engine';
import { Direction } from 'affinity-engine-stage';
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

  _setup(choices) {
    this._entryPoint();

    set(this, 'attrs.choices', choices);

    return this;
  },

  classNames(classNames) {
    this._entryPoint();

    set(this, 'attrs.classNames', classNames);

    return this;
  },

  header(header) {
    this._entryPoint();

    set(this, 'attrs.header', header);

    return this;
  },

  keyboardPriority(keyboardPriority) {
    this._entryPoint();

    set(this, 'attrs.keyboardPriority', keyboardPriority);

    return this;
  },

  keys(keys) {
    this._entryPoint();

    set(this, 'attrs.keys', keys);

    return this;
  },

  transition(...args) {
    this._entryPoint();

    this.transitionIn(...args);

    return this;
  },

  transitionIn(effect, duration, options = {}) {
    this._entryPoint();

    set(this, 'attrs.transitionIn', assign({ duration, effect }, options));

    return this;
  },

  transitionOut(effect, duration, options = {}) {
    this._entryPoint();

    set(this, 'attrs.transitionOut', assign({ duration, effect }, options));

    return this;
  }
});
