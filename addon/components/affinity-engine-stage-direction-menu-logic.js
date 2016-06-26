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
  producer: multiton('affinity-engine/producer', 'engineId'),

  keyboardActivated: alias('producer.isFocused'),

  choices: configurable(configurationTiers, 'choices'),
  customClassNames: configurable(configurationTiers, 'classNames'),
  header: configurable(configurationTiers, 'header'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),
  keyboardPriority: configurable(configurationTiers, 'keyboardPriority'),
  menuUI: configurable(configurationTiers, 'menuUI'),

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

        return Ember.Object.create({
          ...value,
          key,
          text: typeOf(text) === 'string' ? text : ''
        });
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
