import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu-logic';
import multiton from 'ember-multiton-service';
import { configurable } from 'affinity-engine';

const {
  Component,
  computed,
  get,
  isPresent,
  typeOf
} = Ember;

const { computed: { alias } } = Ember;
const { inject: { service } } = Ember;

const configurationTiers = [
  'directable.attrs',
  'config.attrs.stage.menu',
  'config.attrs.stage',
  'config.attrs.globals'
];

export default Component.extend({
  layout,

  tagName: null,

  config: multiton('affinity-engine/config', 'engineId'),
  translator: service('affinity-engine/translator'),
  stateManager: multiton('affinity-engine/state-manager', 'engineId'),

  keyboardActivated: alias('stateManager.isFocused'),

  choices: configurable(configurationTiers, 'choices'),
  columns: configurable(configurationTiers, 'menuColumns'),
  customClassNames: configurable(configurationTiers, 'classNames'),
  header: configurable(configurationTiers, 'header'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),
  keyboardPriority: configurable(configurationTiers, 'keyboardPriority'),
  acceptKeys: configurable(configurationTiers, 'keys.accept'),
  cancelKeys: configurable(configurationTiers, 'keys.escape'),
  moveDownKeys: configurable(configurationTiers, 'keys.moveDown'),
  moveLeftKeys: configurable(configurationTiers, 'keys.moveLeft'),
  moveRightKeys: configurable(configurationTiers, 'keys.moveRight'),
  moveUpKeys: configurable(configurationTiers, 'keys.moveUp'),

  didInsertElement(...args) {
    this._super(...args);

    if (isPresent(get(this, 'priorSceneRecord'))) {
      const choice = get(this, 'priorSceneRecord');

      this.send('choose', choice);
    }
  },

  joinedCustomClassNames: computed('customClassNames.[]', {
    get() {
      const classNames = get(this, 'customClassNames');

      return typeOf(classNames) === 'array' ? classNames.join(' ') : classNames;
    }
  }),

  translatedChoices: computed('choices.[]', {
    get() {
      const choices = get(this, 'choices');

      return choices.map((value, index) => {
        const key = get(value, 'key') || index;
        const text = get(this, 'translator').translate(value);

        return {
          ...value,
          key,
          text: typeOf(text) === 'string' ? text : ''
        };
      });
    }
  }).readOnly(),

  translatedHeader: computed('header', {
    get() {
      const header = get(this, 'header');

      return get(this, 'translator').translate(header);
    }
  }).readOnly()
});
