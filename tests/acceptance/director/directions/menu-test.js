import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | ember-theater/director/directions/menu', {
  beforeEach() {
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Ember Theater | Director | Directions | Menu', function(assert) {
  visit('/ember-theater/test-scenarios/director/directions/menu');
});
