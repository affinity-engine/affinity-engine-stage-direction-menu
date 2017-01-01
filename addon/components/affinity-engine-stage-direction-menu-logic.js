import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu-logic';
import { registrant } from 'affinity-engine';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';

const {
  Component,
  computed,
  get,
  isPresent,
  typeOf
} = Ember;

const { computed: { alias } } = Ember;
const { run: { next } } = Ember;

export default Component.extend(PerfectScrollbarMixin, {
  layout,

  classNames: ['ae-menu', 'ae-stage-direction-menu'],
  classNameBindings: ['customClassNames'],

  hook: 'affinity_engine_stage_direction_menu_logic',

  translator: registrant('affinity-engine/translator'),

  keyboardActivated: alias('isFocused'),

  choices: alias('directable.choices'),
  columns: alias('directable.columns'),
  customClassNames: alias('directable.customClassNames'),
  text: alias('directable.text'),
  iconFamily: alias('directable.iconFamily'),
  keyboardPriority: alias('directable.keyboardPriority'),
  acceptKeys: alias('directable.acceptKeys'),
  cancelKeys: alias('directable.cancelKeys'),
  moveDownKeys: alias('directable.moveDownKeys'),
  moveLeftKeys: alias('directable.moveLeftKeys'),
  moveRightKeys: alias('directable.moveRightKeys'),
  moveUpKeys: alias('directable.moveUpKeys'),

  perfectScrollbarOptions: {
    suppressScrollX: true
  },

  didInsertElement(...args) {
    this._super(...args);

    if (isPresent(get(this, 'priorSceneRecord'))) {
      const choice = get(this, 'priorSceneRecord');

      this.send('choose', choice);
    } else {
      next(() => this.element.scrollTop = 0);
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

  translatedText: computed('text', {
    get() {
      const text = get(this, 'text.key') || get(this, 'text');

      return get(this, 'translator').translate(text, get(this, 'text.options')) || text;
    }
  }).readOnly()
});
