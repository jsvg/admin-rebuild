import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('data-viz-rebuild', 'Integration | Component | data viz rebuild', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{data-viz-rebuild}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#data-viz-rebuild}}
      template block text
    {{/data-viz-rebuild}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
