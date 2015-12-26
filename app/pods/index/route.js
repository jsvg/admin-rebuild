// T index
import Ember from 'ember';
const { Route } = Ember;
export default Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      filtered: this.store.query('project', params)
    });
  }
});