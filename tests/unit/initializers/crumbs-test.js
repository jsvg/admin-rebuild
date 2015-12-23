import Ember from 'ember';
import CrumbsInitializer from '../../../initializers/crumbs';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | crumbs', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  CrumbsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
