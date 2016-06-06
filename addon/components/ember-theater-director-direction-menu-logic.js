import Ember from 'ember';
import layout from '../templates/components/ember-theater-director-direction-menu-logic';
import multiton from 'ember-multiton-service';
import { configurable } from 'ember-theater';

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
  'config.attrs.director.menu',
  'config.attrs.director',
  'config.attrs.globals'
];

export default Component.extend({
  layout,

  tagName: null,

  config: multiton('ember-theater/config', 'theaterId'),
  translator: service('ember-theater/translator'),
  producer: multiton('ember-theater/producer', 'theaterId'),

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
