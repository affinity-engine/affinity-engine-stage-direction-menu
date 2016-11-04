import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu-logic';
import { registrant } from 'affinity-engine';

const {
  Component,
  computed,
  get,
  isPresent,
  typeOf
} = Ember;

const { computed: { alias } } = Ember;

export default Component.extend({
  layout,

  tagName: null,

  translator: registrant('affinity-engine/translator'),

  keyboardActivated: alias('isFocused'),

  choices: alias('directable.choices'),
  columns: alias('directable.columns'),
  header: alias('directable.header'),
  iconFamily: alias('directable.iconFamily'),
  keyboardPriority: alias('directable.keyboardPriority'),
  acceptKeys: alias('directable.acceptKeys'),
  cancelKeys: alias('directable.cancelKeys'),
  moveDownKeys: alias('directable.moveDownKeys'),
  moveLeftKeys: alias('directable.moveLeftKeys'),
  moveRightKeys: alias('directable.moveRightKeys'),
  moveUpKeys: alias('directable.moveUpKeys'),

  didInsertElement(...args) {
    this._super(...args);

    if (isPresent(get(this, 'priorSceneRecord'))) {
      const choice = get(this, 'priorSceneRecord');

      this.send('choose', choice);
    }
  },

  translatedChoices: computed('choices.[]', {
    get() {
      const choices = get(this, 'choices');

      return choices.map((value, index) => {
        const key = get(value, 'key') || index;
        const textKey = get(value, 'text.key') || get(value, 'text') || value;
        const text = get(this, 'translator').translate(textKey, get(value, 'text.options')) || textKey;

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
      const header = get(this, 'header.key') || get(this, 'header');

      return get(this, 'translator').translate(header, get(this, 'header.options')) || header;
    }
  }).readOnly()
});
