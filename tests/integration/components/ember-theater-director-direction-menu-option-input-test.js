import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-theater-director-direction-menu-option-input', 'Integration | Component | ember theater director direction menu option input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-theater-director-direction-menu-option-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-theater-director-direction-menu-option-input}}
      template block text
    {{/ember-theater-director-direction-menu-option-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
