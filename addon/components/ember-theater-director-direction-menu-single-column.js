import Ember from 'ember';
import layout from '../templates/components/ember-theater-director-direction-menu-single-column';
import { keyDown, EKMixin } from 'ember-keyboard';
import multiton from 'ember-multiton-service';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';
import { configurable } from 'ember-theater';
import { StyleableComponentMixin } from 'ember-theater-director';

const {
  Component,
  computed,
  get,
  getProperties,
  isPresent,
  on,
  typeOf
} = Ember;

const { run: { next } } = Ember;

const mixins = [
  EKMixin,
  PerfectScrollbarMixin,
  StyleableComponentMixin
];

const configurationTiers = [
  'directable.attrs',
  'config.attrs.director.menu',
  'config.attrs.director',
  'config.attrs.globals'
];

export default Component.extend(...mixins, {
  layout,

  classNames: ['et-menu', 'et-menu-single-column'],
  classNameBindings: ['joinedCustomClassNames'],
  hook: 'menu_direction_single_column',

  perfectScrollbarOptions: {
    suppressScrollX: true
  },

  config: multiton('ember-theater/config', 'theaterId'),

  keyboardPriority: configurable(configurationTiers, 'keyboardPriority'),
  moveUpKeys: configurable(configurationTiers, 'keys.moveUp'),
  moveDownKeys: configurable(configurationTiers, 'keys.moveDown'),
  customClassNames: configurable(configurationTiers, 'classNames'),

  joinedCustomClassNames: computed('customClassNames.[]', {
    get() {
      const classNames = get(this, 'customClassNames');

      return typeOf(classNames) === 'array' ? classNames.join(' ') : classNames;
    }
  }),

  setupKeys: on('init', function() {
    const { moveDownKeys, moveUpKeys } = getProperties(this, 'moveDownKeys', 'moveUpKeys');

    moveDownKeys.forEach((key) => this.on(keyDown(key), (event) => this.focusDown(event)));
    moveUpKeys.forEach((key) => this.on(keyDown(key), (event) => this.focusUp(event)));
  }),

  focusFirstMenu: on('didInsertElement', function() {
    next(() => {
      if (get(this, 'keyboardActivated')) {
        this.focusDown();
      }
    });
  }),

  focusDown(event) {
    this.keyboardEvent(event, (index, length) => {
      return index + 1 === length ? 0 : index + 1;
    });
  },

  focusUp(event) {
    this.keyboardEvent(event, (index, length) => {
      return index - 1 < 0 ? length - 1 : index - 1;
    });
  },

  keyboardEvent(event, indexCallback) {
    if (isPresent(event)) {
      event.preventDefault();
    }

    const choices = this.$('button');
    const current = document.activeElement;
    const index = choices.index(current);
    const length = choices.length;
    const newIndex = indexCallback(index, length);

    choices.eq(newIndex).focus();
  }
});
