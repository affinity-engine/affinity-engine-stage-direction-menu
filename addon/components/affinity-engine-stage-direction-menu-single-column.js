import Ember from 'ember';
import layout from '../templates/components/affinity-engine-stage-direction-menu-single-column';
import { keyDown, EKMixin } from 'ember-keyboard';
import multiton from 'ember-multiton-service';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';
import { configurable } from 'affinity-engine';
import { StyleableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  get,
  getProperties,
  isPresent
} = Ember;

const { run: { next } } = Ember;

const mixins = [
  EKMixin,
  PerfectScrollbarMixin,
  StyleableComponentMixin
];

const configurationTiers = [
  'directable.attrs',
  'config.attrs.stage.menu',
  'config.attrs.stage',
  'config.attrs.globals'
];

export default Component.extend(...mixins, {
  layout,

  classNames: ['ae-menu', 'ae-menu-single-column'],
  classNameBindings: ['menuClassNames'],
  hook: 'menu_direction_single_column',

  perfectScrollbarOptions: {
    suppressScrollX: true
  },

  config: multiton('affinity-engine/config', 'engineId'),

  moveUpKeys: configurable(configurationTiers, 'keys.moveUp'),
  moveDownKeys: configurable(configurationTiers, 'keys.moveDown'),

  init(...args) {
    this._super(...args);

    const { moveDownKeys, moveUpKeys } = getProperties(this, 'moveDownKeys', 'moveUpKeys');

    if (isPresent(moveDownKeys)) {
      moveDownKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusDown(event)));
    }

    if (isPresent(moveUpKeys)) {
      moveUpKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusUp(event)));
    }
  },

  didInsertElement(...args) {
    this._super(...args);

    next(() => {
      if (get(this, 'keyboardActivated')) {
        this._focusDown();
      }
    });
  },

  _focusDown(event) {
    this._keyboardEvent(event, (index, length) => {
      return index + 1 === length ? 0 : index + 1;
    });
  },

  _focusUp(event) {
    this._keyboardEvent(event, (index, length) => {
      return index - 1 < 0 ? length - 1 : index - 1;
    });
  },

  _keyboardEvent(event, indexCallback) {
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
