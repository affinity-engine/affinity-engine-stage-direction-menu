import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../../tests/helpers/module-for-acceptance';
import { $hook, hook } from 'ember-hook';

moduleForAcceptance('Acceptance | ember-theater/director/directions/menu', {
  beforeEach() {
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Ember Theater | Director | Directions | Menu', function(assert) {
  assert.expect(22);

  visit('/ember-theater/test-scenarios/director/directions/menu').then(() => {
    assert.equal($hook('menu_direction').length, 1, 'menu is rendered');
    assert.equal($hook('menu_direction_single_column').length, 1, 'menu defaults to single-column');
    assert.equal($hook('menu_direction_option').length, 3, 'options are rendered');
    assert.equal($hook('menu_direction_option_button').length, 3, 'options default to buttons');
    assert.ok($hook('menu_direction_single_column').hasClass('ps-container'), 'perfect scrollbar was applied');

    return click(Ember.$(`${hook('menu_direction_option_button')}:nth(1)`));
  }).then(() => {
    assert.equal($hook('data').text().trim(), 'key: 1, text: B', 'first result correct');

    return click(Ember.$(`${hook('menu_direction_option_button')}:nth(2)`));
  }).then(() => {
    assert.equal($hook('data').text().trim(), 'key: keyC, text: textC', 'second result correct');

    return click(Ember.$(`${hook('menu_direction_option_button')}:nth(0)`));
  }).then(() => {
    assert.equal($hook('menu_direction_option_input').length, 1, 'input is rendered');
    assert.equal($hook('menu_direction_option_button').length, 2, 'button is removed');

    return fillIn(hook('menu_direction_option_input'), 'foo');
  }).then(() => {
    return triggerEvent(hook('menu_direction_option_input'), 'blur');
  }).then(() => {
    assert.equal($hook('menu_direction_option_input').length, 0, 'input is removed');
    assert.equal($hook('menu_direction_option_button').length, 3, 'button is restored');

    return click(Ember.$(`${hook('menu_direction_option_button')}:nth(0)`));
  }).then(() => {
    assert.equal($hook('menu_direction_option_input').length, 1, 'input is restored');
    assert.equal($hook('menu_direction_option_input').val(), 'foo', 'input value persisted');

    return keyDown('Enter');
  }).then(() => {
    debugger
    assert.equal($hook('data').text().trim(), 'key: keyA, text: textA, input: foo', 'third result correct');
    assert.equal($hook('menu_direction_header').text().trim(), 'foo', 'header is set correctly');
    assert.ok($hook('menu_direction_single_column').hasClass('bar'), 'className bar added correctly');
    assert.ok($hook('menu_direction_single_column').hasClass('baz'), 'className baz added correctly');
    assert.ok(Ember.$(`${hook('menu_direction_option_button')}:nth(0)`).is(':focus'), 'the first button is auto-focused');

    return keyDown('ArrowDown');
  }).then(() => {
    assert.ok(Ember.$(`${hook('menu_direction_option_button')}:nth(1)`).is(':focus'), 'ArrowDown moves the focus down');

    return keyDown('ArrowUp');
  }).then(() => {
    assert.ok(Ember.$(`${hook('menu_direction_option_button')}:nth(0)`).is(':focus'), 'ArrowUp moves the focus up');

    return keyDown('ArrowUp');
  }).then(() => {
    assert.ok(Ember.$(`${hook('menu_direction_option_button')}:nth(2)`).is(':focus'), 'ArrowUp rolls over to the bottom');

    return keyDown('ArrowDown');
  }).then(() => {
    assert.ok(Ember.$(`${hook('menu_direction_option_button')}:nth(0)`).is(':focus'), 'ArrowDown rolls over to the top');
  });
});
