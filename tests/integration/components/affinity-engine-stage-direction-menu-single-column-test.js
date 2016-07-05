import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';

const {
  set
} = Ember;

moduleForComponent('affinity-engine-stage-direction-menu-single-column', 'Integration | Component | Affinity Engine Stage direction menu single column', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it renders a header if provided', function(assert) {
  assert.expect(1);

  this.render(hbs`{{affinity-engine-stage-direction-menu-single-column header="foo"}}`);

  assert.equal(this.$(hook('menu_direction_header')).text().trim(), 'foo', 'header was rendered');
});

test('it renders the list of choices', function(assert) {
  assert.expect(1);

  const choices = [{}, {}, {}];

  set(this, 'choices', choices);

  this.render(hbs`{{affinity-engine-stage-direction-menu-single-column
    choices=choices
    option=(component "affinity-engine-stage-direction-menu-option")
  }}`);

  assert.equal(this.$(hook('menu_direction_option')).length, 3, 'the correct number of choices was rendered');
});
