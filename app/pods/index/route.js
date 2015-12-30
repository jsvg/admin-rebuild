// T index
import Ember from 'ember';
const { Route, RSVP } = Ember;
export default Route.extend({
  model(params) {
    return RSVP.hash({
      filtered: this.store.query('project', params)
    });
  }
});