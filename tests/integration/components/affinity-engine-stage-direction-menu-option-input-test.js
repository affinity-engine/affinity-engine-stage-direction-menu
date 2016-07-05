import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';

const {
  setProperties
} = Ember;

moduleForComponent('affinity-engine-stage-direction-menu-option-input', 'Integration | Component | Affinity Engine Stage direction menu option input', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it auto focuses itself', function(assert) {
  assert.expect(1);

  this.render(hbs`{{affinity-engine-stage-direction-menu-option-input}}`);

  assert.equal(this.$(hook('menu_direction_option_input')).get(0), document.activeElement, 'it is focused');
});

test('it triggers `toggleInput` on `focusOut`', function(assert) {
  assert.expect(1);

  setProperties(this, {
    toggleInput() {
      assert.ok(true, 'toggleInput was called')
    },
    choose() {
      assert.ok(false, 'choose was called');
    }
  });

  this.render(hbs`{{affinity-engine-stage-direction-menu-option-input toggleInput=(action toggleInput) choose=(action choose)}}`);

  this.$(hook('menu_direction_option_input')).blur();
});
