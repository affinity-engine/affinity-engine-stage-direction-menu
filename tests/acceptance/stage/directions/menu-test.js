import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../../tests/helpers/module-for-acceptance';
import { $hook, hook } from 'ember-hook';

moduleForAcceptance('Acceptance | affinity-engine/stage/directions/menu', {
  beforeEach() {
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Affinity Engine | Director | Directions | Menu', function(assert) {
  assert.expect(21);

  const done = assert.async();

  visit('/affinity-engine/test-scenarios/stage/directions/menu').then(() => {
    assert.equal($hook('affinity_engine_stage_direction_menu').length, 1, 'menu is rendered');
    assert.equal($hook('ember_flex_menu_option').length, 28, 'options are rendered');
    assert.equal($hook('ember_flex_menu_option_button').length, 26, 'options default to buttons, but can specify sliders');
    assert.ok($hook('ember_flex_menu').hasClass('ps-container'), 'perfect scrollbar was applied');

    return click(Ember.$(`${hook('ember_flex_menu_option_button')}:nth(1)`));
  }).then(() => {
    assert.equal($hook('data').text().trim(), 'key: 1, text: B', 'first result correct');

    return click(Ember.$(`${hook('ember_flex_menu_option_button')}:nth(2)`));
  }).then(() => {
    assert.equal($hook('data').text().trim(), 'key: keyC, text: textC', 'second result correct');

    return click(Ember.$(`${hook('ember_flex_menu_option_button')}:nth(0)`));
  }).then(() => {
    assert.equal($hook('ember_flex_menu_option_input').length, 1, 'input is rendered');
    assert.equal($hook('ember_flex_menu_option_button').length, 2, 'button is removed');

    return fillIn(hook('ember_flex_menu_option_input'), 'foo');
  }).then(() => {
    // for some reason, triggerEvent event no longer works here. . . .
    $hook('ember_flex_menu_option_input').blur();

    return delay(100);
  }).then(() => {
    assert.equal($hook('ember_flex_menu_option_input').length, 0, 'input is removed');
    assert.equal($hook('ember_flex_menu_option_button').length, 3, 'button is restored');

    return click(Ember.$(`${hook('ember_flex_menu_option_button')}:nth(0)`));
  }).then(() => {
    assert.equal($hook('ember_flex_menu_option_input').length, 1, 'input is restored');
    assert.equal($hook('ember_flex_menu_option_input').val(), 'foo', 'input value persisted');

    return keyDown('Enter');
  }).then(() => {
    return delay(100);
  }).then(() => {
    assert.equal($hook('data').text().trim(), 'key: keyA, text: textA, input: foo', 'third result correct');
    assert.equal($hook('affinity_engine_stage_direction_menu_text').text().trim(), 'foo', 'text is set correctly');
    assert.ok($hook('affinity_engine_stage_direction_menu_logic').hasClass('bar'), 'className bar added correctly');
    assert.ok($hook('affinity_engine_stage_direction_menu_logic').hasClass('baz'), 'className baz added correctly');
    assert.equal($hook('ember_flex_menu_option_button').get(0), document.activeElement, 'the first button is auto-focused');

    return keyDown('ArrowDown');
  }).then(() => {
    assert.equal($hook('ember_flex_menu_option_button').get(1), document.activeElement, 'ArrowDown moves the focus down');

    return keyDown('ArrowUp');
  }).then(() => {
    assert.equal($hook('ember_flex_menu_option_button').get(0), document.activeElement, 'ArrowUp moves the focus up');

    return keyDown('ArrowUp');
  }).then(() => {
    assert.equal($hook('ember_flex_menu_option_button').get(2), document.activeElement, 'ArrowUp rolls over to the bottom');

    return keyDown('ArrowDown');
  }).then(() => {
    assert.equal($hook('ember_flex_menu_option_button').get(0), document.activeElement, 'ArrowDown rolls over to the top');

    done();
  });
});
