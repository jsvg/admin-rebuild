import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('styles', function() {
    this.route('ui', function() {
      this.route('buttons');
      this.route('icons');
      this.route('modals');
      this.route('general');
      this.route('stats');
    });
    this.route('tables', function() {
      this.route('simple');
      this.route('data');
    });
    this.route('forms', function() {
      this.route('general');
      this.route('advanced');
    });
    this.route('templates', function() {
      this.route('404');
    });
  });
  this.route('visualizations', function() {
    this.route('C3');
  });
});

export default Router;
