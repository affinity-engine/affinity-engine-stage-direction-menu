import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';
import { initialize as initializeMultitons } from 'ember-multiton-service';

const {
  getOwner,
  set
} = Ember;

moduleForComponent('ember-theater-director-direction-menu-single-column', 'Integration | Component | ember theater director direction menu single column', {
  integration: true,

  beforeEach() {
    const appInstance = getOwner(this);

    initializeHook();
    initializeMultitons(appInstance);
  }
});

test('it renders a header if provided', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ember-theater-director-direction-menu-single-column header="foo"}}`);

  assert.equal(this.$(hook('menu_direction_header')).text().trim(), 'foo', 'header was rendered');
});

test('it renders the list of choices', function(assert) {
  assert.expect(1);

  const choices = [{}, {}, {}];

  set(this, 'choices', choices);

  this.render(hbs`{{ember-theater-director-direction-menu-single-column
    choices=choices
    option=(component "ember-theater-director-direction-menu-option")
  }}`);

  assert.equal(this.$(hook('menu_direction_option')).length, 3, 'the correct number of choices was rendered');
});
