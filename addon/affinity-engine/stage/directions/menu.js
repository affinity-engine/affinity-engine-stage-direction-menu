import Ember from 'ember';
import { configurable, classNamesConfigurable, deepConfigurable } from 'affinity-engine';
import { Direction } from 'affinity-engine-stage';
import multiton from 'ember-multiton-service';

const {
  computed,
  merge,
  set
} = Ember;

const configurationTiers = [
  '_attrs',
  'config.attrs.component.stage.direction.menu',
  'config.attrs.component.stage',
  'config.attrs'
];

export default Direction.extend({
  componentPath: 'affinity-engine-stage-direction-menu',
  layer: 'engine.prompt.menu',

  attrs: computed(() => new Object({
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
  })),

  config: multiton('affinity-engine/config', 'engineId'),
  fixtureStore: multiton('affinity-engine/fixture-store', 'engineId'),

  _setup(choices, text) {
    this._entryPoint();

    set(this, 'attrs.choices', choices);
    set(this, 'attrs.text', text);

    return this;
  },

  _reset() {
    return this._super({ });
  },

  classNames(classNames) {
    this._entryPoint();

    set(this, '_attrs.classNames', classNames);

    return this;
  },

  header(header) {
    this._entryPoint();

    set(this, '_attrs.header', header);

    return this;
  },

  keyboardPriority(keyboardPriority) {
    this._entryPoint();

    set(this, '_attrs.keyboardPriority', keyboardPriority);

    return this;
  },

  keys(keys) {
    this._entryPoint();

    set(this, '_attrs.keys', keys);

    return this;
  },

  transition(...args) {
    this._entryPoint();

    this.transitionIn(...args);

    return this;
  },

  transitionIn(effect, duration, options = {}) {
    this._entryPoint();

    set(this, '_attrs.transitionIn', merge({ duration, effect }, options));

    return this;
  },

  transitionOut(effect, duration, options = {}) {
    this._entryPoint();

    set(this, '_attrs.transitionOut', merge({ duration, effect }, options));

    return this;
  }
});
