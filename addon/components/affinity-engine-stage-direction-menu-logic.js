import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu-logic';
import { classNames, registrant } from 'affinity-engine';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';

const {
  Component,
  assign,
  computed,
  get,
  typeOf
} = Ember;

const { computed: { reads } } = Ember;
const { run: { next } } = Ember;

export default Component.extend(PerfectScrollbarMixin, {
  layout,

  classNames: ['ae-menu', 'ae-stage-direction-menu'],
  classNameBindings: ['customClassNames'],

  hook: 'affinity_engine_stage_direction_menu_logic',

  translator: registrant('affinity-engine/translator'),

  keyboardActivated: reads('isFocused'),

  configuration: reads('direction.configuration.attrs'),
  choices: reads('configuration.choices'),
  columns: reads('configuration.menu.columns'),
  text: reads('configuration.text'),
  iconFamily: reads('configuration.iconFamily'),
  keyboardPriority: reads('configuration.keyboardPriority'),
  acceptKeys: reads('configuration.keys.accept'),
  cancelKeys: reads('configuration.keys.cancel'),
  moveDownKeys: reads('configuration.keys.moveDown'),
  moveLeftKeys: reads('configuration.keys.moveLeft'),
  moveRightKeys: reads('configuration.keys.moveRight'),
  moveUpKeys: reads('configuration.keys.moveUp'),

  customClassNames: classNames('configuration.classNames'),

  perfectScrollbarOptions: {
    suppressScrollX: true
  },

  didInsertElement(...args) {
    this._super(...args);

    next(() => this.element.scrollTop = 0);
  },

  translatedChoices: computed('choices.[]', {
    get() {
      const choices = get(this, 'choices');

      return choices.map((value, index) => {
        const key = get(value, 'key') || index;
        const textKey = get(value, 'text.key') || get(value, 'text') || value;
        const text = get(this, 'translator').translate(textKey, get(value, 'text.options')) || textKey;

        return assign({}, value, {
          key,
          text: typeOf(text) === 'string' ? text : ''
        });
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
